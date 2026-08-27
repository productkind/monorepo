# Dungarees coding rules

Conventions for this package, compiled from review feedback. They override default habits — follow them exactly. Every rule below has a bad and a good example; the difference between them is the rule.

## 1. Test-first (strict TDD)

Change the test first and watch it go **red** before touching the implementation — including during refactors and redesigns, not only for new behaviour. Only then write the implementation that turns it green.

```ts
// Bad — implement first, then backfill a test that just re-states the code.
export const rankOf = (name) => LEVELS[name] ?? 0
// test written afterwards can only confirm what you already wrote; it never had a chance to fail
test('rankOf', () => expect(rankOf('warn')).toBe(2))
```

```ts
// Good — test first, run it, see it fail for the expected reason...
test('drops messages below the given level', async () => {
  await renderCliToStdio({ app, argv: [], controls, level: 'warn', process })
  expect(readStdout()).toBe('') // RED: renderer has no level filter yet
})
// ...then implement the filter until it goes green.
```

A pure refactor keeps existing tests green; if no test can express the change, that is the signal it is behaviour-preserving — still run the suite.

## 2. One options object, not positional args

Functions take a **single options object** holding all arguments, rather than several positional parameters — even the already-decided ones. When adding a parameter, convert the whole signature to an options object rather than appending another positional arg.

Why: positional lists grow unwieldy and make call sites ambiguous, especially once optional/defaulted params (an injected `process`, a `level`) are involved.

```ts
// Bad
renderCliToStdio(app, argv, controls, level, process)
renderCliToStdio(app, [], controls, undefined, process) // what is `undefined` here?
```

```ts
// Good
renderCliToStdio({ app, argv, controls, level, process })
renderCliToStdio({ app, argv: [], controls, process }) // omit what you don't set
```

## 3. Dispatch with an object keyed by type, not switch/case

Map the discriminant to a handler object. Type each handler to its narrowed variant with a mapped type.

```ts
// Bad
switch (message.type) {
  case 'stdout': process.stdout.write(`${message.message}${EOL}`); break
  case 'stderr': process.stderr.write(`${message.message}${EOL}`); break
  case 'exit': process.exit(message.code); break
}
```

```ts
// Good
const render: {
  [TYPE in CliMessage['type']]: (message: Extract<CliMessage, { type: TYPE }>) => void
} = {
  stdout: (message) => { process.stdout.write(`${message.message}${EOL}`) },
  stderr: (message) => { process.stderr.write(`${message.message}${EOL}`) },
  exit: (message) => { process.exit(message.code) },
}
```

## 4. No unsafe type assertions — neither `as` casts nor `!` non-null assertions

Both `as` and `!` silence the type checker instead of satisfying it. Reach for a type-safe construction, a narrowing guard, or a runtime check that also asserts the invariant.

### 4a. `as` casts

When indexing a handler map with a union key trips TypeScript's correlated-union limitation, route the call through a small generic helper where the key is a single type parameter, so the handler's parameter type checks cleanly.

```ts
// Bad — silences the checker instead of satisfying it
next: (message) => (render[message.type] as (message: CliMessage) => void)(message)
```

```ts
// Good — generic key parameter, no cast
const dispatch = <TYPE extends CliMessage['type']>(
  message: Extract<CliMessage, { type: TYPE }>,
): void => render[message.type](message)

next: (message) => dispatch(message)
```

### 4b. `!` non-null assertions

`x!` claims "trust me, not null" and crashes silently if you're wrong. Narrow with a real check — in a test that check also documents the invariant.

```ts
// Bad — asserts non-null, hides the failure mode
const help = await configured!.getHelp()
```

```ts
// Good — a guard that narrows and states the invariant
if (configured === undefined) {
  throw new Error('route should have been called during present()')
}
const help = await configured.getHelp()
```

## 5. Stub with objects as real as possible; assert the contract, not the implementation

This is **not** only about streams. Use the real collaborator — or the closest real thing — and only substitute when it becomes genuinely inconvenient (it hits the network, the clock, randomness, or terminates the process). Then assert on the **observable outcome** (what was produced), never on *how* the code called its collaborator. A test that mirrors the implementation's calls breaks on every refactor and proves nothing about the real contract.

```ts
// Bad — a spy that records the calls the code makes.
// This tests that `.write` was invoked in a particular shape, i.e. the implementation.
const stdout = { write: vi.fn() }
await renderCliToStdio({ app, argv: [], controls, process: { stdout, stderr, exit } })
expect(stdout.write).toHaveBeenCalledWith(`Hello, World!${EOL}`) // couples to HOW output is emitted
```

```ts
// Good — a real stream; read back what actually ended up on stdout.
// This tests the contract: "this text was written to stdout".
import { PassThrough } from 'node:stream'
const stdout = new PassThrough() // real object, buffers while unconsumed
await renderCliToStdio({ app, argv: [], controls, process: { stdout, stderr, exit } })
expect(String(stdout.read() ?? '')).toBe(`Hello, World!${EOL}`)
```

Same principle where a real object is inconvenient — substitute the smallest surface and still assert the outcome, not the call:

```ts
// Bad — asserts the call was made
const exit = vi.fn()
expect(exit).toHaveBeenCalledWith(0)
```

```ts
// Good — process.exit would kill the test runner, so capture the outcome and assert it
const exitCodes: number[] = []
const exit = (code: number) => { exitCodes.push(code) }
expect(exitCodes).toEqual([0]) // the contract: we exit with 0
```

### 5b. Fake the boundary, use the real code, drive the real entry point

Following on from 5: don't mock your own collaborators, and don't call internals directly.
Replace only the true I/O boundary (filesystem, subprocess, network, clock, randomness) with
the dungarees' fakes; run everything else for real, through the entry point it ships behind.

```ts
// Bad — hand-mocked service + calling the handler directly (tests only the wiring)
const behavior = { publishMultiLib: (a) => { calls.push(a); return { events$ } }, ... }
const command = publishLibYargsModule({ publishLib: behavior })(io)
await command.handler({ libPath: '/libs', registry: '...' })
expect(registered).toEqual([events$])
```

```ts
// Good — real service, fakes only for I/O, driven through the test renderer
const publishLib = createPublishLibService({
  fileSystem: createFakeFileSystem({ /* fixture */ }),
  cliCommands: createCliCommands(createFakeSubProcessService([ /* npm publish */ ]).subProcess),
})
const app = createYargsPromptApp<PublishLibEvent>({
  name,
  commands: [publishLibYargsModule({ publishLib })],
  presenter,
  route,
})
const { terminal } = renderCli(app, 'dungarees publish-multi-lib /multi-lib --registry ...')
expect(await terminal.step()).toEqual([
  { type: 'stdout', message: 'All packages published successfully', level: 'info' },
  { type: 'exit', code: 0 },
])
```

## 6. Prefer built-in/standard types; own the source of truth when there is none

Reach for built-in and standard-library types before hand-rolling.

```ts
// Bad — bespoke class that reimplements a standard stream
class Collector extends Writable {
  chunks: string[] = []
  _write(chunk, _enc, cb) { this.chunks.push(chunk.toString()); cb() }
}
```

```ts
// Good — the standard stream already does this
import { PassThrough } from 'node:stream'
const stream = new PassThrough()
```

Do **not** couple to a third-party library's type just because it has a fitting name (`vite`/`esbuild` `LogLevel`) — wrong package, different semantics. When nothing built-in exists (Node has no ranked log-level type), define one small const as the single source of truth and derive types from it.

```ts
// Bad — import a fitting-looking type from an unrelated package
import type { LogLevel } from 'vite'
```

```ts
// Good — one const is the source of truth; the type is derived, not duplicated
const NODE_LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const
type LogLevel = keyof typeof NODE_LOG_LEVELS
```

Keep a type intentionally wide only when the API is genuinely configurable (e.g. `level: string` because callers may supply their own `levels` map) — and say so at the point it matters.

## 7. Comment the *why*, never the *what*

The code already says what it does; a comment that restates it is noise that rots. Only add a comment where the reason isn't visible in the code — most often to justify a rule violation you had to make, or to explain the edge case that forced a non-obvious implementation. If you can't name a *why*, delete the comment.

```ts
// Bad — narrates what the next line plainly does
// create a ReplaySubject that buffers every registered stream
const registeredOuts$ = new ReplaySubject<Observable<CliMessage>>(Infinity)
// map each event through the presenter
events$.pipe(map((event) => presenter[event.type](event.payload)))
```

```ts
// Good — explains why a rule-4 cast is unavoidable here (a why you can't read off the code)
// A Proxy target cannot be statically typed as the generated shape, and no type-safe
// construction of a dynamic keyed object exists.
new Proxy({} as EventCreators<PAYLOADS>, { ... })

// Good — explains the edge case that forced the non-simple implementation
// Deferred so a synchronous parse throw (yargs validates before awaiting under fail(false))
// surfaces as an observable error rather than escaping present().
const parsed$ = defer(() => from(routed.parseAsync(argv)))
```

## 8. Test complicated types at the type level

When the point of a change *is* a type — inference from another argument, a generic that has to hold across a collection, erasure, or anything built from `Parameters`/`ReturnType`/`Extract`/a mapped or conditional type — a runtime test cannot see it. State the contract with `tsafe`'s `assert<Equals<…>>()`, and mark what must **not** compile with `@ts-expect-error`, in the same `.test.ts` file so `type-check` enforces it.

Why: a green suite says nothing about a boundary whose whole value is static. `createCommand` exists so a handler cannot read an argument its builder never declared — delete the generic and every runtime test still passes.

```ts
// Bad — passes whether or not the handler is typed; the boundary is untested
test('the command runs', async () => {
  await collectValuesFrom(app.present(['greet', 'Alice'], controls))
  expect(greeted).toEqual(['Alice'])
})
```

```ts
// Good — the contract stated as types, checked by tsc
test('createCommand infers the handler arguments from what the builder declared', () => {
  createCommand({
    command: 'greet [who]',
    describe: 'Greet someone',
    builder: (yargs) =>
      yargs
        .positional('who', { type: 'string', default: 'World' })
        .option('times', { type: 'number' }),
    handler: (args) => {
      assert<Equals<typeof args.who, string>>()
      assert<Equals<typeof args.times, number | undefined>>()
    },
  })
})
```

### 8a. Spell out the expected type, and show the assertion can fail

Rule 1 applies to types. An assertion written after the implementation never had a chance to fail, so it may be asserting nothing — most often because both sides derive from the same expression. Spell the expected type out literally. If you cannot run the assertion red first, mutate the implementation until it goes red, then restore.

```ts
// Bad — both sides come from the same expression, so it holds no matter what the type becomes
type Args = Parameters<typeof handler>[0]
assert<Equals<Args, Parameters<typeof handler>[0]>>()
```

```ts
// Good — the expected type is written out, so a change in inference breaks the build
// (verified red by typing the handler as `(args: Record<string, unknown>)`:
//  TS2344 Type 'false' does not satisfy the constraint 'true')
assert<Equals<typeof args.times, number | undefined>>()
```

### 8b. Keep `@ts-expect-error` on the narrowest line, and check it reports unused

The directive swallows *any* error on the line that follows, so a wrong claim passes silently and the comment lies. Put it on the one line the error must come from, and confirm it reports `TS2578: Unused '@ts-expect-error' directive` once you make the claim correct — that is the red step for a negative test.

```ts
// Bad — the directive covers the whole handler and the comment is false: the real error was
// that annotating the parameter stopped ARGS being inferred at all, leaving the handler with
// `ArgumentsCamelCase<unknown>`, which has no `times` of any type.
// @ts-expect-error the builder declares `times` as a number, not a string
handler: ({ times }: { times: string }) => { ... }
```

```ts
// Good — one line, and the claim is exactly the error that occurs
handler: ({ times }) => {
  // @ts-expect-error the builder declares `times` as a number, so it is never a string
  const wrong: string = times
}
```

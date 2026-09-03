# Dungarees coding rules

Conventions for this package, compiled from review feedback. They override default habits — follow
them exactly. Every rule below has a bad and a good example; the difference between them is the
rule.

## 1. Test-first (strict TDD)

Change the test first and watch it go **red** before touching the implementation — including during
refactors and redesigns, not only for new behaviour. Only then write the implementation that turns
it green.

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

A pure refactor keeps existing tests green; if no test can express the change, that is the signal it
is behaviour-preserving — still run the suite.

## 2. One options object, not positional args

Functions take a **single options object** holding all arguments, rather than several positional
parameters — even the already-decided ones. When adding a parameter, convert the whole signature to
an options object rather than appending another positional arg.

Why: positional lists grow unwieldy and make call sites ambiguous, especially once
optional/defaulted params (an injected `process`, a `level`) are involved.

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

Map the discriminant to a handler object. Type each handler to its narrowed variant with a mapped
type.

<!-- prettier-ignore -->
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
  stdout: (message) => {
    process.stdout.write(`${message.message}${EOL}`)
  },
  stderr: (message) => {
    process.stderr.write(`${message.message}${EOL}`)
  },
  exit: (message) => {
    process.exit(message.code)
  },
}
```

## 4. No unsafe type assertions — neither `as` casts nor `!` non-null assertions

Both `as` and `!` silence the type checker instead of satisfying it. Reach for a type-safe
construction, a narrowing guard, or a runtime check that also asserts the invariant.

### 4a. `as` casts

When indexing a handler map with a union key trips TypeScript's correlated-union limitation, route
the call through a small generic helper where the key is a single type parameter, so the handler's
parameter type checks cleanly.

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

`x!` claims "trust me, not null" and crashes silently if you're wrong. Narrow with a real check — in
a test that check also documents the invariant.

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

This is **not** only about streams. Use the real collaborator — or the closest real thing — and only
substitute when it becomes genuinely inconvenient (it hits the network, the clock, randomness, or
terminates the process). Then assert on the **observable outcome** (what was produced), never on
_how_ the code called its collaborator. A test that mirrors the implementation's calls breaks on
every refactor and proves nothing about the real contract.

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

Same principle where a real object is inconvenient — substitute the smallest surface and still
assert the outcome, not the call:

```ts
// Bad — asserts the call was made
const exit = vi.fn()
expect(exit).toHaveBeenCalledWith(0)
```

```ts
// Good — process.exit would kill the test runner, so capture the outcome and assert it
const exitCodes: number[] = []
const exit = (code: number) => {
  exitCodes.push(code)
}
expect(exitCodes).toEqual([0]) // the contract: we exit with 0
```

### 5b. Fake the boundary, use the real code, drive the real entry point

Following on from 5: don't mock your own collaborators, and don't call internals directly. Replace
only the true I/O boundary (filesystem, subprocess, network, clock, randomness) with the dungarees'
fakes; run everything else for real, through the entry point it ships behind.

```ts
// Bad — hand-mocked service + calling the handler directly (tests only the wiring)
const behavior = { publishMultiLib: (a) => { calls.push(a); return { events$ } }, ... }
const command = publishLibYargsModule({ publishLib: behavior })(io)
await command.handler({ libPath: '/libs', registry: '...' })
expect(registered).toEqual([events$])
```

```ts
// Good — real service, fakes only for I/O, driven through the test renderer
const publishLib = createPublishLibBehavior({
  fileSystem: createFakeFileSystem({
    /* fixture */
  }),
  cliCommands: createCliCommands(
    createFakeSubProcessService([
      /* npm publish */
    ]).subProcess,
  ),
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

### 5c. Hand back the real object; let the test drive it

A shared test helper returns the thing under test, not a wrapper around how you exercise it. And an
app-driven test belongs beside the code it covers — never inside the fake app, which exists to serve
tests rather than to hold them.

```ts
// Bad — the helper owns the rendering, so every test inherits its choices
const { run } = createTestApp({ files })
const { terminal } = run('dungarees publish-multi-lib /multi-lib')
```

```ts
// Good — the helper returns the app; the test renders it like any other
const { app, executedCommands } = createTestApp({ files, commands })
const { terminal } = renderCli(app, 'dungarees publish-multi-lib /multi-lib')
```

## 6. Prefer built-in/standard types; own the source of truth when there is none

Reach for built-in and standard-library types before hand-rolling.

```ts
// Bad — bespoke class that reimplements a standard stream
class Collector extends Writable {
  chunks: string[] = []
  _write(chunk, _enc, cb) {
    this.chunks.push(chunk.toString())
    cb()
  }
}
```

```ts
// Good — the standard stream already does this
import { PassThrough } from 'node:stream'
const stream = new PassThrough()
```

Do **not** couple to a third-party library's type just because it has a fitting name
(`vite`/`esbuild` `LogLevel`) — wrong package, different semantics. When nothing built-in exists
(Node has no ranked log-level type), define one small const as the single source of truth and derive
types from it.

```ts
// Bad — import a fitting-looking type from an unrelated package
import type { LogLevel } from 'vite'
```

```ts
// Good — one const is the source of truth; the type is derived, not duplicated
const NODE_LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const
type LogLevel = keyof typeof NODE_LOG_LEVELS
```

Keep a type intentionally wide only when the API is genuinely configurable (e.g. `level: string`
because callers may supply their own `levels` map) — and say so at the point it matters.

### 6a. Declare object shapes as `type`, not `interface`

Prefer a type alias. This is a convention rather than a lint rule, because there is one case a
linter cannot see: hotscript's `Fn` pattern reads `this['arg0']`, and a `this` type exists only in
an interface or a class. Converting one of those to a type alias fails to compile, so
`consistent-type-definitions` is deliberately off.

```ts
// Bad — an interface for a plain object shape
export interface UrlConfig {
  protocol: string
  hostname: string
}
```

```ts
// Good — a type alias
export type UrlConfig = {
  protocol: string
  hostname: string
}

// Good — an interface, because `this` has no meaning in a type alias
interface AppendConstFn extends Fn {
  return: `${this['arg0']}-const`
}
```

## 7. Comment the _why_, never the _what_

The code already says what it does; a comment that restates it is noise that rots. Only add a
comment where the reason isn't visible in the code — most often to justify a rule violation you had
to make, or to explain the edge case that forced a non-obvious implementation. If you can't name a
_why_, delete the comment.

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

The failure mode to watch for is a real _why_ padded with a second sentence describing the code
beneath it. Write the reason, then stop.

## 8. Test complicated types at the type level

When the point of a change _is_ a type — inference from another argument, a generic that has to hold
across a collection, erasure, or anything built from `Parameters`/`ReturnType`/`Extract`/a mapped or
conditional type — a runtime test cannot see it. State the contract with vitest's
`expectTypeOf(…).toEqualTypeOf<…>()`, and mark what must **not** compile with `@ts-expect-error`, in
the same `.test.ts` file — both `npm run type-check` and vitest's typecheck mode enforce it.

Why: a green suite says nothing about a boundary whose whole value is static. `createCommand` exists
so a handler cannot read an argument its builder never declared — delete the generic and every
runtime test still passes.

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
      expectTypeOf<typeof args.who>().toEqualTypeOf<string>()
      expectTypeOf<typeof args.times>().toEqualTypeOf<number | undefined>()
    },
  })
})
```

### 8a. Spell out the expected type, and show the assertion can fail

Rule 1 applies to types. An assertion written after the implementation never had a chance to fail,
so it may be asserting nothing — most often because both sides derive from the same expression.
Spell the expected type out literally. If you cannot run the assertion red first, mutate the
implementation until it goes red, then restore.

```ts
// Bad — both sides come from the same expression, so it holds no matter what the type becomes
type Args = Parameters<typeof handler>[0]
expectTypeOf<Args>().toEqualTypeOf<Parameters<typeof handler>[0]>()
```

```ts
// Good — the expected type is written out, so a change in inference breaks the build
// (verified red by typing the handler as `(args: Record<string, unknown>)`:
//  TS2344 Type 'false' does not satisfy the constraint 'true')
expectTypeOf<typeof args.times>().toEqualTypeOf<number | undefined>()
```

### 8b. Keep `@ts-expect-error` on the narrowest line, and check it reports unused

The directive swallows _any_ error on the line that follows, so a wrong claim passes silently and
the comment lies. Put it on the one line the error must come from, and confirm it reports
`TS2578: Unused '@ts-expect-error' directive` once you make the claim correct — that is the red step
for a negative test.

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

### 8c. Flatten an intersection before comparing it

`expectTypeOf` compares an intersection by its parts, so `{ a?: string } & { b: number }` is not
equal to the object it is equivalent to. Flatten it with `FlattenIntersection` rather than weakening
the assertion to `toMatchTypeOf`.

```ts
// Bad — fails even though the two types are the same
type OptionalA = PartialBesides<{ a: string; b: number }, 'b'>
expectTypeOf<OptionalA>().toEqualTypeOf<{ a?: string; b: number }>()
```

```ts
// Good — flattened first, and still a strict comparison
expectTypeOf<FlattenIntersection<OptionalA>>().toEqualTypeOf<{ a?: string; b: number }>()
```

## 9. Keep a behaviour thin — operations own the logic

A behaviour wires services to operations and composes the resulting event streams. It should reach
for **`concat` and nothing else**. Conditional logic, event creation, and primitive rx operators
(`map`, `mergeMap`, `from`, `of`, `forkJoin`) belong in operations, where they are testable without
a filesystem or a subprocess.

Why: operations are pure and can be tested in isolation; every operator left in a behaviour is logic
reachable only through a service.

```ts
// Bad — the behaviour picks the outcome event, creates events, and pipes primitives
const audit$ = forkJoin({ manifests: manifests$, sources: sources$ }).pipe(
  mergeMap(({ manifests, sources }) => {
    const findings = auditPackages({ manifests, sources })
    return concat(
      from(findings.map((finding) => eventCreators.packageFindings(finding))),
      of(
        findings.length === 0
          ? eventCreators.auditPassed({ packageCount: manifests.length })
          : eventCreators.auditFailed({ packageCount: manifests.length }),
      ),
    )
  }),
)
```

```ts
// Good — services in, operations do the work, concat composes the streams
const startEvent$ = getAuditStartEvent({ dir })
const audit$ = getManifestsAndSources({
  manifestPaths$: fileSystem.glob(`${sourceDir}/**/package.json`),
  sourcePaths$: fileSystem.glob(`${sourceDir}/**/*.{ts,tsx}`),
  readFile: (filePath) => fileSystem.readFile(filePath, 'utf-8'),
}).pipe(reportFindings())
return { events$: concat(startEvent$, audit$) }
```

Domain policy belongs in operations too. A list like "packages that may be declared without being
imported" is a rule of the feature, not a wiring decision, so it is the operation's default rather
than something the behaviour passes in.

## 10. A service exposes the boundary unchanged

A field named after a boundary value must **be** that value. Interpreting it — trimming, defaulting,
reshaping — belongs where it is consumed, not in the service that supplies it.

```ts
// Bad — every later reader of services.process.argv inherits a silent truncation
process: {
  argv: process.argv.slice(2), stdout: process.stdout, /* ... */
}
```

```ts
// Good — the boundary as it is, with the CLI's convention applied at the point of use
process: {
  argv: process.argv, stdout: process.stdout, /* ... */
}

// in main:
// argv is the real process.argv, so the node binary and the script path come first
await renderCliToStdio({ argv: argv.slice(2), app: delivery.app, controls: {}, process })
```

It also keeps the fakes honest: with the slice hidden inside `getServices`, a test's fake `argv`
means something different from production's, so a wrong slice in `main` would still pass.

## 11. Make the library you already have do the job

Before adding a mechanism, check whether something already in the design does it. A second layer
that duplicates a library's job has to be kept in step with it forever.

```ts
// Bad — a zod schema re-validating arguments the yargs builder already declares and checks
args: z.object({ libPath: z.string(), registry: z.string().optional() }),
handler: (args) => { /* ... */ }
```

```ts
// Good — the builder is the single declaration; yargs infers and validates from it
builder: (yargs) =>
  yargs
    .positional('lib-path', { type: 'string', default: '.' })
    .option('registry', { type: 'string' }),
handler: ({ libPath, registry }) => { /* ... */ }
```

The same applies to parsing: use the real parser rather than a regex over source text.
`ts.preProcessFile` knows an import from a string that merely contains one, which a regex cannot —
and the difference was a wrong answer, not a stylistic preference.

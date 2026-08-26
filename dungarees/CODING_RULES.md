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

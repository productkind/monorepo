import { readSerialisedState, serialiseState, STATE_ELEMENT_ID } from './serialised-state.ts'

import { expect, test } from 'vitest'

test('state survives the trip through the document', () => {
  const state = { todos: { items: [{ id: '1', title: 'Write tests', completed: false }] } }
  const document = documentHolding(serialiseState(state))

  expect(readSerialisedState({ document })).toEqual(state)
})

// A title is user input, and an unescaped `</script>` in it would end the tag early and turn the
// rest of the state into markup.
test('a title that looks like markup cannot close the script tag', () => {
  const serialised = serialiseState({ title: '</script><img src=x onerror=alert(1)>' })

  expect(serialised).not.toContain('</script>')
  expect(JSON.parse(serialised)).toEqual({ title: '</script><img src=x onerror=alert(1)>' })
})

test('line separators that are legal in json but not in javascript are escaped', () => {
  expect(serialiseState({ title: '\u2028\u2029' })).toBe('{"title":"\\u2028\\u2029"}')
})

test('a document with no state element reads as nothing rather than throwing', () => {
  expect(readSerialisedState({ document: documentWithoutState() })).toBeUndefined()
})

type FakeDocument = { getElementById: (id: string) => { textContent: string | null } | null }

const documentHolding = (serialised: string): FakeDocument => ({
  getElementById: (id) => (id === STATE_ELEMENT_ID ? { textContent: serialised } : null),
})

const documentWithoutState = (): FakeDocument => ({ getElementById: () => null })

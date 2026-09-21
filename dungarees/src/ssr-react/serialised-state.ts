export const STATE_ELEMENT_ID = '__APP_STATE__'

const ESCAPES: Record<string, string> = {
  // Escaping `<` is what keeps a title containing `</script>` or `<!--` from ending the tag early.
  '<': '\\u003c',
  // Legal inside a JSON string but a line terminator to a JavaScript parser.
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
}

export const serialiseState = (state: unknown): string =>
  JSON.stringify(state).replace(/[<\u2028\u2029]/g, (character) => ESCAPES[character] ?? character)

export type StateDocument = {
  getElementById: (id: string) => { textContent: string | null } | null
}

export const readSerialisedState = ({ document }: { document: StateDocument }): unknown => {
  const textContent = document.getElementById(STATE_ELEMENT_ID)?.textContent
  return textContent === undefined || textContent === null ? undefined : JSON.parse(textContent)
}

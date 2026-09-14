// Only languages whose comments this can recognise without guessing: a `//` in markdown or YAML is
// prose or a value, not a comment.
const JUDGED_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']

export const isJudgedFile = (file: string): boolean =>
  JUDGED_EXTENSIONS.some((extension) => file.endsWith(extension))

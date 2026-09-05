/**
 * Sections a person marked as wanting a different gif, kept in the video's own asset folder as
 * `flags.json` — beside `timeline.json`, which narrate writes the same way.
 *
 * The flag records which gif was flagged, not just the section number. A complaint is about a
 * particular gif, so it stops applying the moment that gif is replaced.
 */

export type Flag = { src: string }

/** Keyed by section index. JSON object keys are strings, which is what the file holds. */
export type Flags = Record<string, Flag>

export const parseFlags = ({ text: contents }: { text: string }): Flags => {
  try {
    const parsed: unknown = JSON.parse(contents)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {}
    }
    return Object.fromEntries(
      Object.entries(parsed).flatMap(([section, value]) =>
        typeof value === 'object' && value !== null && 'src' in value && typeof value.src === 'string'
          ? [[section, { src: value.src }]]
          : [],
      ),
    )
  } catch {
    return {}
  }
}

export const isFlagged = ({
  flags,
  section,
  src,
}: {
  flags: Flags
  section: number
  src: string
}): boolean => flags[String(section)]?.src === src

export const toggled = ({
  flags,
  section,
  src,
}: {
  flags: Flags
  section: number
  src: string
}): Flags => {
  const key = String(section)
  if (isFlagged({ flags, section, src })) {
    return Object.fromEntries(Object.entries(flags).filter(([section]) => section !== key))
  }
  return { ...flags, [key]: { src } }
}

/** Sections in numeric order, so flagging §2 after §14 still diffs as one added line. */
export const serialiseFlags = ({ flags }: { flags: Flags }): string => {
  const ordered = Object.fromEntries(
    Object.entries(flags).sort(([left], [right]) => Number(left) - Number(right)),
  )
  return `${JSON.stringify(ordered, null, 2)}\n`
}

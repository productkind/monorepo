import type { Badge } from './badges'

/** A row of small monospace facts. Tone carries the judgement so the numbers stay scannable. */
export const BadgeRow: React.FC<{ badges: (Badge | undefined)[] }> = ({ badges }) => (
  <div className="badges">
    {badges.flatMap((badge, index) =>
      badge === undefined
        ? []
        : [
            <span key={`${badge.text}-${String(index)}`} className={`badge ${badge.tone}`}>
              {badge.text}
            </span>,
          ],
    )}
  </div>
)

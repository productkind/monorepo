import { INK } from './theme'

/**
 * The objects the clips point at, drawn as cut paper: one weight of black line, flat fills, no
 * gradients inside a shape and no detail that survives being 80 pixels tall on a phone.
 *
 * They are SVG rather than an icon set because every one of them has to animate a part of itself
 * — a pin travels, an arrow sweeps, a tick draws on — and a font glyph cannot be taken apart.
 */
const STROKE = 10

type IconProps = { size: number; color?: string }

const Svg: React.FC<React.PropsWithChildren<{ size: number }>> = ({ size, children }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {children}
  </svg>
)

export const PinIcon: React.FC<IconProps> = ({ size, color = INK }) => (
  <Svg size={size}>
    <path
      d="M50 12c-14 0-24 10-24 23 0 17 24 45 24 45s24-28 24-45c0-13-10-23-24-23z"
      fill="#ffffff"
      stroke={color}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
    <circle cx="50" cy="35" r="9" fill={color} />
  </Svg>
)

/** One clean turn, with the arrowhead that says it comes back round. */
export const RepeatIcon: React.FC<IconProps> = ({ size, color = INK }) => (
  <Svg size={size}>
    <path d="M22 50a28 28 0 1 1 10 21" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    <path d="M16 34l6 18 18-6z" fill={color} />
  </Svg>
)

export const TickIcon: React.FC<IconProps & { drawn?: number }> = ({
  size,
  color = '#00ed70',
  drawn = 1,
}) => (
  <Svg size={size}>
    <path
      d="M22 52l18 18 38-40"
      stroke={color}
      strokeWidth={14}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - drawn}
    />
  </Svg>
)

export const CursorIcon: React.FC<IconProps> = ({ size, color = INK }) => (
  <Svg size={size}>
    <path
      d="M28 18l44 30-19 4 11 22-10 5-11-22-13 13z"
      fill="#ffffff"
      stroke={color}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
  </Svg>
)

export const MagnifierIcon: React.FC<IconProps> = ({ size, color = INK }) => (
  <Svg size={size}>
    <circle cx="44" cy="44" r="24" fill="#ffffff" stroke={color} strokeWidth={STROKE} />
    <path d="M62 62l22 22" stroke={color} strokeWidth={14} strokeLinecap="round" />
  </Svg>
)

export const BookmarkIcon: React.FC<IconProps> = ({ size, color = INK }) => (
  <Svg size={size}>
    <path
      d="M30 16h40v68L50 68 30 84z"
      fill="#ffb65b"
      stroke={color}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
  </Svg>
)

export const PhoneIcon: React.FC<IconProps> = ({ size, color = INK }) => (
  <Svg size={size}>
    <rect
      x="30"
      y="12"
      width="40"
      height="76"
      rx="10"
      fill="#ffffff"
      stroke={color}
      strokeWidth={STROKE}
    />
    <path d="M44 22h12" stroke={color} strokeWidth={6} strokeLinecap="round" />
  </Svg>
)

export const BrowserIcon: React.FC<IconProps> = ({ size, color = INK }) => (
  <Svg size={size}>
    <rect
      x="12"
      y="22"
      width="76"
      height="56"
      rx="10"
      fill="#ffffff"
      stroke={color}
      strokeWidth={STROKE}
    />
    <path d="M12 40h76" stroke={color} strokeWidth={STROKE} />
    <circle cx="26" cy="31" r="4" fill={color} />
  </Svg>
)

export const AppIcon: React.FC<IconProps> = ({ size, color = INK }) => (
  <Svg size={size}>
    <rect
      x="20"
      y="20"
      width="60"
      height="60"
      rx="16"
      fill="#8efd23"
      stroke={color}
      strokeWidth={STROKE}
    />
    <circle cx="50" cy="50" r="12" fill={color} />
  </Svg>
)

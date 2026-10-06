import { useState } from 'react'

// Links point at the homepage sections, so they work from any page.
const NAVIGATION_LINKS = [
  { href: '/#hero', label: 'Home' },
  { href: '/#our-product', label: 'Our Product', className: 'navigation-link-product' },
  { href: '/#about', label: 'About' },
  { href: '/#newsletter', label: 'Newsletter' },
  { href: '/#seminars', label: 'Seminars' },
  { href: '/#our-talks', label: 'Our Talks' },
]

export const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header" data-menu-open={isMenuOpen}>
      <nav className="site-navigation">
        <a href="/#hero" className="navigation-logo">
          <img src="/assets/logo-invert.svg" width="48" alt="productkind logo" />
        </a>
        <span className="menu-items">
          {NAVIGATION_LINKS.map(({ href, label, className = '' }) => (
            <a
              key={href}
              href={href}
              className={`navigation-link ${className}`}
              onClick={closeMenu}
            >
              <span className="navigation-link-text">{label}</span>
            </a>
          ))}
        </span>
        <button
          type="button"
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      </nav>
    </header>
  )
}

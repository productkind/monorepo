import './Home.css'
import { useState } from 'react'
import { Instagram, Linkedin } from 'lucide-react'
import {Typography} from './Typography'

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return <main className="site">
    <header className="site-header" data-menu-open={isMenuOpen}>
      <nav className="site-navigation">
        <a href="#hero" className="navigation-logo">
            <img src="assets/logo-invert.svg" width="48" alt="productkind logo"/>
        </a>
        <span className="menu-items">
          <a href="#hero" className="navigation-link" onClick={closeMenu}>
            <span className="navigation-link-text">Home</span>
          </a>
          <a href="#our-product" className="navigation-link navigation-link-product" onClick={closeMenu}>
            <span className="navigation-link-text">Our&nbsp;Product</span>
          </a>
          <a href="#about" className="navigation-link" onClick={closeMenu}>
            <span className="navigation-link-text">About</span>
          </a>
          <a href="#newsletter" className="navigation-link" onClick={closeMenu}>
            <span className="navigation-link-text">Newsletter</span>
          </a>
          <a href="#seminars" className="navigation-link" onClick={closeMenu}>
            <span className="navigation-link-text">Seminars</span>
          </a>
          <a href="#our-talks" className="navigation-link" onClick={closeMenu}>
            <span className="navigation-link-text">Our&nbsp;Talks</span>
          </a>
        </span>
        <div className="hamburger-button" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </div>
      </nav>
    </header>
    <section id="hero" className="bento hero">
      <div className="box left hero-logo">
        <img className="hero-logo-image" src="assets/logo.svg" width="200" alt="productkind logo"/>
      </div>
      <div className="box box-highlight hero-tagline">
        <Typography component="h1" variant="h1" className="tagline">
          You build-build, so we build-build for you
        </Typography>
      </div>
      <div className="box right hero-what-we-do">
        <Typography component="h2" variant="h2">What we do</Typography>
        <Typography component="p" variant="body">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Typography>
      </div>
    </section>
    <section id="our-product" className="bento our-product">
      <div className="box box-highlight-product our-product-header">
        <Typography component="h2" variant="h2">
          Our Product
        </Typography>
      </div>
      <div className="box top our-product-image">
        <img className="our-product-logo" src="assets/logo-little-parrot.svg" width="200" alt="Little Parrot logo"/>
      </div>
      <div className="box our-product-description">
        <Typography component="h3" variant="h3">
          What it is
        </Typography>
        <Typography component="p" variant="body">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Typography>
        <Typography component="p" variant="body">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Typography>
        <a href="#" className="button button-primary-product">Check it out</a>
      </div>
    </section>
    <section id="about" className="bento about">
      <div className="box box-highlight about-header">
        <Typography component="h2" variant="h2">
          About Us
        </Typography>
      </div>
      <div className="box right about-description">
        <Typography component="h3" variant="h3">
          Conception of productkind
        </Typography>
        <Typography component="p" variant="body">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Typography>
        <Typography component="p" variant="body">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Typography>
      </div>
      <div className="box right about-team box-highlight box-vertical">
        <Typography component="h3" variant="h3">
          Team
        </Typography>
      </div>
      <div className="box kim about-kinga-description">
        <Typography component="h4" variant="h3">
          Kinga Magyar
        </Typography>
        <Typography component="h5" variant="h4">
          Product Builder &amp; Coach
        </Typography>
        <Typography component="p" variant="body">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Typography>
      </div>
      <div className="box kim about-image about-kinga-image">
        <img className="image-kinga" src="assets/photo-kinga.webp" width="400" alt="Photo of the productkind team"/>
      </div>
      <div className="box tim about-kinga-description">
        <Typography component="h4" variant="h3">
          Tamas Kokeny
        </Typography>
        <Typography component="h5" variant="h4">
          Educator
        </Typography>
        <Typography component="p" variant="body">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Typography>
      </div>
      <div className="box tim about-image about-tamas-image">
        <img className="image-kinga" src="assets/photo-tamas.webp" width="400" alt="Photo of the productkind team"/>
      </div>
    </section>
    <section id="newsletter" className="bento newsletter">
      <div className="box right box-highlight newsletter-header">
        <Typography component="h2" variant="h2">
          Newsletter
        </Typography>
      </div>
      <div className="box left newsletter-description">
        <Typography component="p" variant="body">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Typography>
        <a href="#" className="button button-primary-newsletter">Subscribe</a>
      </div>
      <div className="box top newsletter-image">
        <img className="newsletter-logo" src="assets/logo-thoughts.svg" width="600" alt="Thoughts by productkind logo"/>
      </div>
    </section>
    <section id="seminars" className="bento seminars">
      <div className="box box-highlight seminars-header">
        <Typography component="h2" variant="h2">
          Seminars
        </Typography>
      </div>
      <div className="box left seminars-description">
        <Typography component="p" variant="body">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Typography>
        <a href="#" className="button button-primary-seminars">See upcoming seminars</a>
      </div>
      <div className="box right seminars-image">
        <img className="seminars-logo" src="assets/logo-seminars.svg" width="300" alt="Seminars by productkind logo"/>
      </div>
    </section>
    <section id="our-talks" className="bento our-talks">
      <div className="box box-highlight our-talks-header">
        <Typography component="h2" variant="h2">
          Our Talks
        </Typography>
      </div>
      <div className="box top our-talks-description">
        <Typography component="p" variant="body">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Typography>
      </div>
    </section>
    <footer className="site-footer">
      <a href="#" className="footer-logo">
        <img src="assets/logo-invert.svg" width="48" alt="productkind logo"/>
      </a>
      <a className="footer-link" href="mailto:hello@productkind.com">hello@productkind.com</a>
      <div className="footer-social">
        <a className="footer-link" href="https://www.instagram.com/by_productkind/" target="_blank" rel="noopener noreferrer"><Instagram /></a>
        <a className="footer-link" href="https://www.linkedin.com/company/productkind" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
      </div>
      <Typography component="p" variant="body">
        © 2025 productkind. All rights reserved.
      </Typography>
    </footer>
  </main>
}

export default Home

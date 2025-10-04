import { useState } from 'react'
import './Home.css'

const Home = () => {
  return <main className="site">
      <header className="site-header">
        <nav className="site-navigation">
            <a href="#" className="navigation-logo">
                <img src="assets/logo-invert.svg" width="48" alt="productkind logo"/>
            </a>
            <a href="#" className="navigation-link"><span className="navigation-link-text">Home</span></a>
            <a href="#" className="navigation-link"><span className="navigation-link-text">About</span></a>
            <a href="#" className="navigation-link navigation-link-product"><span className="navigation-link-text">Our Product</span></a>
            <a href="#" className="navigation-link"><span className="navigation-link-text">Newsletter</span></a>
            <a href="#" className="navigation-link"><span className="navigation-link-text">Seminars</span></a>
            <a href="#" className="navigation-link"><span className="navigation-link-text">Our Talks</span></a>
        </nav>
      </header>
      <section className="bento hero">
        <div className="box hero-logo">
          <img className="hero-logo-image" src="assets/logo.svg" width="200" alt="productkind logo"/>
        </div>
        <div className="box box-highlight hero-tagline">
          <h1 className="tagline">You build-build, so we build-build for you</h1>
        </div>
        <div className="box hero-what-we-do">
          <h2>What we do</h2>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
      </section>
      <section className="bento our-product">
        <div className="box box-highlight-product our-product-header">
          <h2>Our Product</h2>
        </div>
        <div className="box our-product-image">
          <img className="our-product-logo" src="assets/logo-little-parrot.svg" width="200" alt="Little Parrot logo"/>
        </div>
        <div className="box our-product-description">
          <h3>What it is</h3>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <a href="#" className="button button-primary-product">Check it out</a>
        </div>
      </section>
      <section className="bento about">
        <div className="box box-highlight about-header">
          <h2>About Us</h2>
        </div>
        <div className="box about-description">
          <h3>Conception of productkind</h3>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
        <div className="box about-team box-highlight box-vertical">
          <h3>Team</h3>
        </div>
        <div className="box about-kinga-description">
          <h4>Kinga Magyar</h4>
          <h5>Product Builder &amp; Coach</h5>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
        <div className="box about-image about-kinga-image">
          <img className="image-kinga" src="assets/photo-kinga.webp" width="400" alt="Photo of the productkind team"/>
        </div>
        <div className="box about-kinga-description">
          <h4>Tamas Kokeny</h4>
          <h5>Educator</h5>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
        <div className="box about-image about-tamas-image">
          <img className="image-kinga" src="assets/photo-tamas.webp" width="400" alt="Photo of the productkind team"/>
        </div>
      </section>
    </main>
}

export default Home

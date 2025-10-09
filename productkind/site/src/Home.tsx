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
        <Typography component="h1" variant="h1" className="tagline main-title">
          We build products to teach how to build products
        </Typography>
      </div>
      <div className="box right hero-what-we-do">
        <Typography component="h2" variant="h2">What we do</Typography>
        <Typography component="p" variant="body">
          At productkind, we teach curious people product and tech skills in a nurturing, and kind environment.
          Our goal is to help people learn and succeed who might not otherwise have the opportunity,
          to replace skill anxiety with confidence, curiosity, and a sense of purpose.
        </Typography>
        <Typography component="p" variant="body">
          We build products that teach how to build products. By combining a product mindset,
          critical thinking, questioning the status quo, and learning through experimentation, with
          a supportive community, we help people grow into fulfilled, capable builders who create
          real value for society.
        </Typography>
      </div>
    </section>
    <section id="our-product" className="bento our-product">
      <div className="box box-highlight-product our-product-header">
        <Typography component="h2" variant="h2" className="main-title">
          Our Product
        </Typography>
      </div>
      <div className="box top our-product-image">
        <img className="our-product-logo" src="assets/logo-little-parrot.svg" width="200" alt="Little Parrot logo"/>
      </div>
      <div className="box with-link our-product-description">
        <div>
          <Typography component="h3" variant="h3">
            What it is
          </Typography>
          <Typography component="p" variant="body">
            <strong>Little Parrot</strong> is a science-based microlearning platform built for busy
            product people. It’s designed to help you master product skills in minutes, not hours, by
            breaking down complex topics into digestible, practical lessons.
          </Typography>
          <Typography component="p" variant="body">
            With Little Parrot, you’ll get:
          </Typography>
          <ul>
            <li>
              Quick, focused lessons you can squeeze into your day
            </li>
            <li>
              Practical skills you can apply immediately
            </li>
            <li>
              A calm, confidence-building path into topics like AI, prompting, and product thinking
            </li>
          </ul>
          <Typography component="p" variant="body">
            In short: it’s learning that doesn’t demand long hours, it meets you where you are,
            and helps you grow step by step.
          </Typography>
        </div>
        <a href="https://littleparrot.app/?utm_source=website&utm_medium=internal&utm_campaign=website" about="_blank" className="button button-primary-product">Check it out</a>
      </div>
    </section>
    <section id="about" className="bento about">
      <div className="box box-highlight about-header">
        <Typography component="h2" variant="h2" className="main-title">
          About Us
        </Typography>
      </div>
      <div className="box right about-description">
        <Typography component="h3" variant="h3">
          Conception of productkind
        </Typography>
        <Typography component="p" variant="body">
          productkind grew out of a simple wish: to create the kind of environment we’d always
          wanted to learn and work in. A place where people believe in what they’re building, where
          curiosity is encouraged, and where kindness is seen as strength
          that helps everyone do better work.
        </Typography>
        <Typography component="p" variant="body">
          We were inspired collaboration and learning, in great teams, in
          thoughtful companies, at events where people shared ideas freely and helped each other
          grow. We wanted to bring that same sense of abundance and purpose to people who might not
          otherwise have access to it.
        </Typography>
        <Typography component="p" variant="body">
          At its heart, productkind exists to give opportunities to those who might otherwise be
          left out. We teach the skills and mindsets that help people succeed and feel fulfilled:
          thinking critically, questioning the status quo, and applying product mindset to creating and beyond.
        </Typography>
        <Typography component="p" variant="body">
          We believe that when people are supported, they create value not just for themselves but
          for society. That’s what we’re building, a nurturing community where learning feels
          meaningful, sustainable, and kind.
        </Typography>
      </div>
      <div className="box right about-team box-highlight box-vertical">
        <Typography component="h3" variant="h3" className="main-title">
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
          Kinga is a curious product leader and founder of the education company productkind.
          Kinga is passionate about making product skills accessible to everyone, regardless of
          background or experience. Through her newsletter, Thoughts by productkind, she shares
          practical, hands-on advice to help product people grow their skills and mindset.
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
          Tamas is an enthusiastic software engineer with a background in product development,
          technical leadership, and education. Tamas is deeply committed to fostering talent and
          sharing knowledge. He served as the Head of Education and Co-Founder at Green Fox Academy,
          a programming bootcamp in Central Europe, where he managed international mentor teams,
          created educational content, and designed curricula.
        </Typography>
      </div>
      <div className="box tim about-image about-tamas-image">
        <img className="image-kinga" src="assets/photo-tamas.webp" width="400" alt="Photo of the productkind team"/>
      </div>
    </section>
    <section id="newsletter" className="bento newsletter">
      <div className="box right box-highlight newsletter-header">
        <Typography component="h2" variant="h2" className="main-title">
          Newsletter
        </Typography>
      </div>
      <div className="box with-link left newsletter-description">
        <div>
          <Typography component="p" variant="body">
            Kinga writes weekly articles focused on practical, hands-on advice for anyone involved in
            building products. Whether you're defining the vision, solving technical challenges,
            refining the user experience, or just getting started, our intention is to help you move
            forward with a bit more clarity and confidence.
          </Typography>
          <Typography component="p" variant="body">
            Each post is designed to offer something useful – whether that’s actionable steps, a
            shift in mindset, or a way to navigate messy or complex situations. We don’t claim to
            have all the answers, but we do hope Thoughts by productkind helps you feel a little more
            at ease with the uncertainty that often comes with working in tech.
          </Typography>
          <Typography component="p" variant="body">
            We care deeply about helping product teams communicate openly, break down silos, and
            collaborate. It leads to better outcomes, and makes the work far more enjoyable too.
          </Typography>
        </div>
        <a href="https://productkind.substack.com/p/the-product-persons-guide-to-mentoring?utm_source=website&utm_medium=internal&utm_campaign=website" about="_blank" className="button button-primary-newsletter">Subscribe</a>
      </div>
      <div className="box top newsletter-image">
        <img className="newsletter-logo" src="assets/logo-thoughts.svg" width="600" alt="Thoughts by productkind logo"/>
      </div>
    </section>
    <section id="seminars" className="bento seminars">
      <div className="box box-highlight seminars-header">
        <Typography component="h2" variant="h2" className="main-title">
          Seminars
        </Typography>
      </div>
      <div className="box with-link left seminars-description">
        <div>
          <Typography component="p" variant="body">
            Seminars by productkind is a learning space for curious product people. We host free
            seminar-style sessions where you exercise critical thinking and thereby build deep
            understanding in a topic within technology. Our aim is to cultivate a product mindset in
            each of our attendees by having thought-provoking discussions about topics related to
            building tech products.
          </Typography>
          <Typography component="p" variant="body">
            Our vision with Seminars by productkind is to empower individuals and teams to create
            more societal value, through exercising product mindset, which ultimately enables them to
            experience fulfilment. We believe that cultivating a product mindset is beneficial in any
            part of your life.
          </Typography>
        </div>
        <a href="https://www.meetup.com/seminars-by-productkind" className="button button-primary-seminars">See upcoming seminars</a>
      </div>
      <div className="box right seminars-image">
        <img className="seminars-logo" src="assets/logo-seminars.svg" width="300" alt="Seminars by productkind logo"/>
      </div>
    </section>
    <section id="our-talks" className="bento our-talks">
      <div className="box box-highlight our-talks-header">
        <Typography component="h2" variant="h2" className="main-title">
          Our Talks
        </Typography>
      </div>
      <div className="box top our-talks-description">
        <dl>
          <dt>
            Wey Wey Web, Málaga, Nov 2025
          </dt>
          <dd>
            Build Your AI Product Coach: A Hands-on Workshop for Writing Impactful User Stories
          </dd>
          <dt>
            NDC Porto, Porto, Oct 2025
          </dt>
          <dd>
            <a href="https://ndcporto.com/workshops/create-your-ai-product-coach-a-hands-on-workshop-for-writing-impactful-user-stories/06197802daa9" about="_blank">
              Create Your AI Product Coach: A Hands-on Workshop for Writing Impactful User Stories
            </a>
          </dd>
          <dt>
            Productized, Lisbon, Oct 2025
          </dt>
          <dd>
            Lessons in Prompting and Vibe Coding: Building an Education Platform for Product People
          </dd>
          <dt>
            Copenhagen Developers Festival, Copenhagen, Sep 2025
          </dt>
          <dd>
            <a href="https://ndccopenhagen.com/agenda/part-12-create-your-ai-product-coach-a-hands-on-workshop-for-writing-impactful-user-stories-00i5/0u4mx6atlvo" about="_blank">
              Create Your AI Product Coach: A Hands-on Workshop for Writing Impactful User Stories
            </a>
          </dd>
          <dt>
            One Tech World, Virtual, Mar 2025
          </dt>
          <dd>
            <a href="https://www.youtube.com/watch?v=L7TOdy4rxLM" target="_blank">
              Navigating Complexity: A Guide to Building Valuable Products in the AI Age
            </a>
          </dd>
          <dt>
            One Tech World, Virtual, Mar 2025
          </dt>
          <dd>
            <a href="https://www.youtube.com/watch?v=msJDZQAHNXY" about="_blank">
              What I learned building an AI user story writing coach – A product manager's experiment
            </a>
          </dd>
          <dt>
            Geek Girls Conference, Porto, Apr 2024
          </dt>
          <dd>
            <a href="https://www.youtube.com/watch?v=mnsurxpPbVc" about="_blank">
              Navigating Complexity: A Guide to Building Valuable Products
            </a>
          </dd>
        </dl>
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

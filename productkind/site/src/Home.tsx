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
          Building a more equitable tech industry.
        </Typography>
      </div>
      <div className="box right hero-what-we-do">
        <Typography component="h2" variant="h2">What we do</Typography>
        <Typography component="p" variant="body">
          We’re building educational tech products that help women and underrepresented groups grow practical tech skills, develop a product mindset – the ability to identify problems worth solving and build valuable solutions – and create with AI. All in a kind, supportive space where everyone belongs.
        </Typography>
        <Typography component="p" variant="body">
          We’re on a mission to build an equitable tech industry by making product and tech skills accessible to everyone, regardless of
          their background.
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
            <strong>Little Parrot</strong> offers science-based micro-courses that make building with AI and vibe coding accessible to everyone. These courses are designed to help you master product and tech skills in minutes, not hours, by breaking down complex topics into digestible, practical challenges.
          </Typography>
          <Typography component="p" variant="body">
            With Little Parrot, you’ll get:
          </Typography>
          <ul>
            <li>
              Quick, focused lessons designed for busy lives.
            </li>
            <li>
              Practical skills you can apply immediately.
            </li>
            <li>
              A calm, confidence-building path into topics like AI, vibe coding, prompting, technology and product thinking.
            </li>
          </ul>
          <Typography component="p" variant="body">
            In short: it’s learning that doesn’t demand long hours, it meets you where you are,
            and helps you grow step by step.
          </Typography>
        </div>
        <a href="https://littleparrot.app/?utm_source=website&utm_medium=internal&utm_campaign=website" about="_blank" className="button button-primary-product">Start learning</a>
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
          productkind started from a simple belief: learning should happen in a space where you can
          experiment, make mistakes, and grow without fear.
        </Typography>
        <Typography component="p" variant="body">
          Too much of tech education relies on creating anxiety, the “you’re behind”
          narrative that generates stress but not solutions. We’re building something different: an
          environment that’s both inspiring and practical, where you develop skills at your own
          pace.
        </Typography>
        <Typography component="p" variant="body">
          We agree with Maya Angelou: “Success is liking yourself, liking what you do, and liking
          how you do it.” That thinking shapes everything we build.
        </Typography>
      </div>
      <div className="box right about-our-why">
        <Typography component="h3" variant="h3">
          Our ‘Why’
        </Typography>
        <Typography component="p" variant="body">
          We’re living through a moment that could reshape who gets to build the future. AI and vibe coding now make it possible for anyone to turn an idea into working software.
        </Typography>
        <Typography component="p" variant="body">
          Yet women are being left out. They make up a large share of online workers and business owners, but only about one in five vibe coders are women. We’ve seen this pattern before, in the early 1980s, women were entering computer science faster than men, until personal computers were marketed mainly to boys.
        </Typography>
        <Typography component="p" variant="body">
          We don’t want to see history repeat itself.
        </Typography>
        <Typography component="p" variant="body">
          Software is a form of power, and power should be shared. When a woman builds something, she creates economic independence, solves problems that matter to her community, and becomes a role model for future generations.
        </Typography>
        <Typography component="p" variant="body">
          That’s why we build educational products that make tech and products skills accessible; taught in a way that fits into busy lives.
        </Typography>
      </div>
      <div className="box right about-values">
        <Typography component="h3" variant="h3">
          Our Values
        </Typography>
        <Typography component="p" variant="body">
          <strong>Curiosity</strong> – We make space for questions, experimentation, and learning out loud. Every interaction
          includes room for “what are we missing?” or “what else could we try?”
        </Typography>
        <Typography component="p" variant="body">
          <strong>Kindness</strong> – We celebrate progress, offer support when things feel hard, and assume positive intent
          in all our interactions.
        </Typography>
        <Typography component="p" variant="body">
          <strong>Integrity</strong> – We’re transparent about our decisions and honest when we fall short. We address concerns
          directly and do what we say we’ll do.
        </Typography>
        <Typography component="p" variant="body">
          <strong>Diversity</strong> – We actively seek different perspectives in our content and community, regularly review
          our materials for inclusivity, and welcome feedback on how we can do better.
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
          Product Leader &amp; Founder
        </Typography>
        <Typography component="p" variant="body">
          Kinga founded productkind after spending a decade in tech across Denmark, Hungary, and
          Portugal, with earlier career experience in Singapore, Italy, and Belgium.
        </Typography>
        <Typography component="p" variant="body">
          She started her career in luxury fashion, drawn to the business side of the industry. But
          the culture didn't fit, it wasn't the kind or caring environment she was looking for.
          When she moved back to Copenhagen and joined Citrix as an account manager, she found what
          she'd been missing. The office was full of people from different countries – smart, open,
          curious – and she fell in love with the tech industry. She wanted to understand how
          software worked, so she joined a coding bootcamp.
        </Typography>
        <Typography component="p" variant="body">
          As a product manager, she led teams across diverse industries and product types, from
          ecommerce and sales management platforms to enterprise automation systems. Along the way,
          she noticed how hard it was to find truly actionable product advice. That's why she
          started writing her newsletter, Thoughts by productkind, and eventually built Little
          Parrot to give people the practical skills they need, without the overwhelm.
        </Typography>
        <Typography component="p" variant="body">
          Kinga believes diverse teams with different viewpoints build better products. She's
          worked with international teams throughout her career and has seen how curiosity and
          openness create stronger collaboration. She's also passionate about making tech more
          welcoming to women and non-binary folks through the language we use and the environments
          we create.
        </Typography>
        <Typography component="p" variant="body">
          She's a certified executive coach, organises ProductTank meetups in Lisbon, and speaks at
          conferences about AI-assisted development and modern product practices.
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
          technical leadership, and education. He’s deeply committed to fostering talent and
          sharing knowledge, and has spent the past 11 years mentoring women and girls in software development. He served as Head of Education and Co-Founder at Green Fox Academy,
          a programming bootcamp in Central Europe, where he managed international mentor teams,
          created educational content, and designed curricula.
        </Typography>
        <Typography component="p" variant="body">
          As a serial entrepreneur, Tamas has co-founded multiple ventures and exited one. He’s held technical roles at companies such as Datadog, Cazoo, and Cloudera, where he spearheaded initiatives in software architecture design and led development teams.
        </Typography>
        <Typography component="p" variant="body">
          He brings deep expertise in making technical concepts accessible and helping people from all backgrounds develop confidence in building with technology.
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
      <div className="box top newsletter-image">
        <img className="newsletter-logo" src="assets/logo-thoughts.svg" width="600" alt="Thoughts by productkind logo"/>
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
    </section>
    <section id="seminars" className="bento seminars">
      <div className="box box-highlight seminars-header">
        <Typography component="h2" variant="h2" className="main-title">
          Seminars
        </Typography>
      </div>
      <div className="box right seminars-image">
        <img className="seminars-logo" src="assets/logo-seminars.svg" width="300" alt="Seminars by productkind logo"/>
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
            Our vision with Seminars by productkind is to inspire individuals and teams to create
            more societal value, through exercising product mindset, which ultimately enables them to
            experience fulfilment. We believe that cultivating a product mindset is beneficial in any
            part of your life.
          </Typography>
        </div>
        <a href="https://www.meetup.com/seminars-by-productkind" className="button button-primary-seminars">See upcoming seminars</a>
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
            <ul>
              <li>
                <a href="https://www.weyweyweb.com/workshops/build-your-ai-product-coach/">
                  Build Your AI Product Coach: A Hands-on Workshop for Writing Impactful User Stories
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/xPEmvEMcxk0">
                  The Infrastructure Gap: Where AI Falls Short in Product Development
                </a>
              </li>
            </ul>
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
            <a href="https://www.youtube.com/watch?v=WrImWJ0KsJM" about="_blank">
              Lessons in Prompting and Vibe Coding: Building an Education Platform for Product People
            </a>
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

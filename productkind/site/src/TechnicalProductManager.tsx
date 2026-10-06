import './Home.css'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import './TechnicalProductManager.css'
import { Typography } from './Typography'

import { CheckCircle } from 'lucide-react'
import { Head } from 'vite-react-ssg'

const PAGE_URL = 'https://productkind.com/technical-product-manager'

const SEO_TITLE = 'Technical Product Manager Course for Non-Technical PMs'
const SEO_DESCRIPTION =
  'A hands-on course for non-technical PMs: understand how software works, follow APIs and releases, investigate bugs and build an AI prototype. Join the waitlist.'

const HERO_BULLETS = [
  'Follow a request through the frontend, the backend, the database and the infrastructure underneath',
  'Work out which parts of your product a proposed feature would change, before you commit',
  'Give engineering the steps that trigger a bug and what you’ve already ruled out',
  'Answer a straightforward product data question yourself',
]

const PATH_STEPS: { title: string; outcome: string }[] = [
  {
    title: 'How a web application works: frontend, backend, database and infrastructure',
    outcome:
      'You’ll go a layer deeper into each part, so you know why a backend is usually several services, and what the terms your team uses about the infrastructure actually refer to; AWS, Google Cloud and Azure included.',
  },
  {
    title: 'How an API works: data flow, webhooks and integrations',
    outcome:
      'You’ll inspect an API request and response and follow the data between systems, so you can ask specific questions about ownership, access and failure when a feature depends on an integration.',
  },
  {
    title: 'How software deployment works: staging vs production',
    outcome:
      'You’ll follow one change through review, testing, staging and release, so you know how a change reaches users and when to expect it there.',
  },
  {
    title: 'Bug triage: reproduce a bug, read the status code, find the failed request',
    outcome:
      'You’ll reproduce a failure, read the status code it returns and find the failed request in the browser’s network tab, so you can involve engineers with a useful starting point.',
  },
  {
    title: 'SQL and product analytics for product managers',
    outcome:
      'You’ll write a simple SQL query and understand what’s behind the numbers on a product analytics dashboard, so you don’t have to wait for someone else to answer a data question.',
  },
  {
    title: 'Technical debt, technical feasibility and build vs buy',
    outcome:
      'You’ll understand what technical debt is costing you, when to prioritise tackling it above a new feature and make a build-versus-buy case.',
  },
  {
    title: 'AI prototyping for product managers',
    outcome:
      'Use an AI agent to build a small working prototype and work out what engineering would still need to address before real users could use it, including security, reliability, monitoring.',
  },
]

const FAQ: { question: string; answer: string }[] = [
  {
    question: 'Do product managers need to be technical?',
    answer:
      'Not in the sense of writing production code. In the discussions we researched, product managers kept coming back to the same outcomes: explaining how their own product works, asking better questions and spotting complexity early. They also said again and again that getting good at a programming language was not the shortest route there.',
  },
  {
    question: 'How technical should a product manager be?',
    answer:
      'Technical enough to follow an explanation, restate it accurately, ask what breaks and judge whether a proposed change is riskier than it sounds. You don’t need to design the architecture or choose the implementation. You do need to follow the trade-offs well enough to speak for the business and the customer while the team decides.',
  },
  {
    question: 'What technical skills do product managers need?',
    answer:
      'There’s no single list, but seven skills came up again and again in our research. Each one is a step in the learning path above.',
  },
  {
    question: 'Will I learn to code?',
    answer:
      'You’ll read some code, and you’ll write some with an AI agent when you build a prototype in the last step. You won’t be learning a programming language, and nothing you build there reaches real users unless engineering takes it on.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'We’re still setting the price. Join the list and you’ll see the current one straight after you sign up, along with one question about whether that price works for you. Your answer helps us decide what to charge.',
  },
  {
    question: 'How long does it take?',
    answer:
      'Each step in the path is self-paced and takes under an hour, in short cards you can work through on your phone. You finish each one with something you made, like a system map or a bug investigation, rather than a set of notes.',
  },
]

// Same order as in the photo, so each name sits under the right person.
const TEAM = [
  { name: 'Tamas Kokeny', role: 'Principal software engineer' },
  { name: 'Kinga Magyar', role: 'Lead product manager' },
]

const COMPANY_LOGOS = [
  { src: '/assets/dd-logo.png', name: 'Datadog', size: 'large' },
  { src: '/assets/citrix-logo.png', name: 'Citrix', size: 'small' },
  { src: '/assets/volkswagen-logo.png', name: 'Volkswagen', size: 'large' },
  { src: '/assets/cloudera-logo.png', name: 'Cloudera', size: 'small' },
]

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: PAGE_URL,
    teaches: PATH_STEPS.map((step) => step.title),
    provider: { '@type': 'Organization', name: 'productkind', url: 'https://productkind.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  },
]

type WaitlistFormProps = {
  id: string
  buttonLabel: string
}

// Markup only for now; submission is wired up separately.
const WaitlistForm = ({ id, buttonLabel }: WaitlistFormProps) => (
  <form className="waitlist-form" noValidate>
    <div className="waitlist-form-row">
      <label htmlFor={id} className="visually-hidden">
        Email address
      </label>
      <input
        id={id}
        className="waitlist-input"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@work.com"
      />
      <button type="submit" className="button waitlist-button">
        {buttonLabel}
      </button>
    </div>
    <p className="waitlist-note">We’ll email you when the learning path opens.</p>
  </form>
)

const TechnicalProductManager = () => (
  <main className="site tpm-page">
    <Head>
      <title>{SEO_TITLE}</title>
      <meta name="description" content={SEO_DESCRIPTION} />
      <link rel="canonical" href={PAGE_URL} />
      <meta property="og:title" content={SEO_TITLE} />
      <meta property="og:description" content={SEO_DESCRIPTION} />
      <meta property="og:image" content="https://productkind.com/assets/og-image.png" />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">{JSON.stringify(JSON_LD)}</script>
    </Head>

    <SiteHeader />

    <section className="bento tpm-hero">
      <div className="box tpm-hero-copy">
        <p className="tpm-eyebrow">For non-technical software Product Managers</p>
        <Typography component="h1" variant="h1" className="tpm-title">
          <span className="tpm-title-highlight">Become a Technical Product Manager</span> Without
          Becoming an Engineer
        </Typography>
        <blockquote className="tpm-quote">
          In our research into product management discussions, the same sentence kept coming up:
          “sometimes it does feel like I’m the least knowledgeable person in the room.”
        </blockquote>
        <Typography className="tpm-lead">
          You know what your product does, but not yet how it works. So when a stakeholder suggests
          a new feature, you can’t yet say roughly how big a change it would be. This learning path
          teaches how the parts of a software product work together, and takes you a layer deeper
          into each one, so you can recognise them in your own and make decisions.
        </Typography>

        <WaitlistForm id="waitlist-hero" buttonLabel="I’m interested" />

        <ul className="tpm-checklist">
          {HERO_BULLETS.map((bullet) => (
            <li key={bullet}>
              <CheckCircle className="tpm-check" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <figure className="box tpm-team">
        <img
          className="tpm-team-photo"
          src="/assets/photo-kinga-tamas.webp"
          width="1200"
          height="800"
          alt="Tamas and Kinga standing side by side at a conference venue"
        />
        <figcaption className="tpm-team-caption">
          <ul className="tpm-team-names">
            {TEAM.map(({ name, role }) => (
              <li key={name}>
                <strong>{name}</strong>
                <span>{role}</span>
              </li>
            ))}
          </ul>
          <p className="tpm-team-previously">Previously at</p>
          <div className="tpm-logos">
            {COMPANY_LOGOS.map(({ src, name, size }) => (
              <img
                key={name}
                src={src}
                alt={name}
                title={name}
                className={`tpm-logo tpm-logo-${size}`}
                loading="lazy"
              />
            ))}
          </div>
        </figcaption>
      </figure>

      <div className="box tpm-team-bio">
        <Typography component="h2" variant="h4">
          Who writes the learning path
        </Typography>
        <Typography>
          We write all of it ourselves. Kinga spent over a decade in the tech industry, learned to
          code, moved into product management and worked as a lead product manager. She has mentored
          product managers and holds an executive coaching diploma.
        </Typography>
        <Typography>
          Tamas spent 15 years as a software engineer and engineering leader. He co-founded Green
          Fox Academy, a coding school that graduated over 3,000 students into tech careers, and has
          spent more than a decade mentoring girls and women in STEM. We both speak at international
          tech conferences.
        </Typography>
      </div>
    </section>

    <section className="bento tpm-path">
      <div className="box box-highlight">
        <Typography component="h2" variant="h2" className="main-title">
          The learning path
        </Typography>
      </div>
      <div className="box tpm-path-intro">
        <Typography>
          Seven steps, each one built around a question product managers search for, and each one
          leaves you able to do something new. The path is still being built, so the order may
          change.
        </Typography>
      </div>
      <ol className="tpm-steps">
        {PATH_STEPS.map(({ title, outcome }, index) => (
          <li key={title} className="tpm-step">
            <span className="tpm-step-number">{index + 1}</span>
            <div className="box tpm-step-body">
              <Typography component="h3" variant="h5">
                {title}
              </Typography>
              <Typography>{outcome}</Typography>
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section className="bento">
      <div className="box">
        <Typography component="h2" variant="h3">
          How the learning path works
        </Typography>
        <Typography>
          It’s made up of hands-on challenges. Every step is self-paced, in short cards you can work
          through on your phone, so you can fit it around the job you’re already doing.
        </Typography>
        <Typography>
          You finish each challenge with something you made rather than a set of notes: a system
          map, a release walkthrough, a bug investigation, a technical decision review and a working
          prototype.
        </Typography>
      </div>
    </section>

    <section className="bento tpm-two-columns">
      <div className="box box-highlight tpm-full-width">
        <Typography component="h2" variant="h2" className="main-title">
          Is this learning path for you?
        </Typography>
      </div>
      <div className="box">
        <Typography component="h3" variant="h4">
          Yes, if
        </Typography>
        <ul className="tpm-list">
          <li>You manage a software product with no engineering background.</li>
          <li>You can describe what your product does, but not how it works.</li>
          <li>
            You want to represent the business and the customer in technical discussions, and follow
            the trade-offs the team is making.
          </li>
          <li>
            You want to answer with confidence when a stakeholder calls something a quick feature,
            because you can see the work behind it.
          </li>
        </ul>
      </div>
      <div className="box">
        <Typography component="h3" variant="h4">
          Not really, if
        </Typography>
        <ul className="tpm-list">
          <li>
            You want to move into an engineering role. This path teaches product judgement, not
            production engineering.
          </li>
          <li>You already read your team’s code and follow architecture discussions.</li>
          <li>
            You’re preparing for a technical product manager interview. This one is about the job
            you already have.
          </li>
        </ul>
      </div>
    </section>

    <section className="bento">
      <div className="box box-highlight">
        <Typography component="h2" variant="h2" className="main-title">
          Frequently asked questions
        </Typography>
      </div>
      <div className="box tpm-faq">
        {FAQ.map(({ question, answer }) => (
          <details key={question} className="tpm-faq-item">
            <summary>
              <Typography component="h3" variant="h5" className="tpm-faq-question">
                {question}
              </Typography>
            </summary>
            <Typography>{answer}</Typography>
          </details>
        ))}
      </div>
    </section>

    <section className="bento">
      <div className="box box-highlight tpm-closing">
        <Typography component="h2" variant="h3">
          Be first to know when it opens
        </Typography>
        <WaitlistForm id="waitlist-footer" buttonLabel="Sign up to waitlist" />
      </div>
    </section>

    <SiteFooter />
  </main>
)

export default TechnicalProductManager

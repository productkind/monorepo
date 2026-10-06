import { Typography } from './Typography'

import { Instagram, Linkedin } from 'lucide-react'

export const SiteFooter = () => (
  <footer className="site-footer">
    <a href="#" className="footer-logo">
      <img src="assets/logo-invert.svg" width="48" alt="productkind logo" />
    </a>
    <a className="footer-link" href="mailto:hello@productkind.com">
      hello@productkind.com
    </a>
    <div className="footer-social">
      <a
        className="footer-link"
        href="https://www.instagram.com/by_productkind/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Instagram />
      </a>
      <a
        className="footer-link"
        href="https://www.linkedin.com/company/productkind"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin />
      </a>
    </div>
    <div className="sponsors">
      <Typography component="p" variant="body">
        Partner of
      </Typography>
      <Typography component="p" variant="body">
        <a href="https://https://elevenlabs.io/startup-grants">
          <img
            className="sponsor-elevenlabs"
            src="https://eleven-public-cdn.elevenlabs.io/payloadcms/cy7rxce8uki-IIElevenLabsGrants%201.webp"
            alt="ElevenLabs"
          />
        </a>
      </Typography>
    </div>
    <Typography component="p" variant="body">
      © 2026 productkind. All rights reserved.
    </Typography>
  </footer>
)

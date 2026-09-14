import { defineVideo, riveAtFrame } from '../narration/definition'
import { FIRST_FEATURE_BODY, hookSections } from './shared/first-feature-hooks'

/**
 * One feature at a time instead of a PRD, opening on "before you paste that PRD".
 *
 * The first of the openings in the script to be cut. The body is shared from one module and
 * narrated as a single take, so a second variant pays for its hook alone.
 */
export default defineVideo({
  id: 'hook-first-feature-01',
  // Placeholder pictures: the test is the opening, not the visuals.
  assets: 'hook-first-feature',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 })],
  sections: [...hookSections({ hook: 'before-you-paste' }), ...FIRST_FEATURE_BODY],
})

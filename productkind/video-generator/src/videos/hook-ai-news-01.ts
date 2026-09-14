import { defineVideo, riveAtFrame } from '../narration/definition'
import { AI_NEWS_BODY, hookSections } from './shared/ai-news-hooks'

/**
 * The week's AI news, opening on "the last video you need".
 *
 * One of four cuts that differ in nothing but their first line. The body is shared from one module
 * and narrated as a single take, so only this hook is paid for: audio is cached by the take's own
 * words, and `narrate` reads any video's folder, so whichever variant is built first records the
 * body for all of them.
 */
export default defineVideo({
  id: 'hook-ai-news-01',
  assets: 'hook-ai-news',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 })],
  sections: [...hookSections({ hook: 'last-video' }), ...AI_NEWS_BODY],
})

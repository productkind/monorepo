import { defineVideo, riveAtFrame } from '../narration/definition'
import { AI_NEWS_BODY, hookSections } from './shared/ai-news-hooks'

/**
 * The week's AI news, opening on "five things happened".
 *
 * One of four cuts that differ in nothing but their first line. Why that costs one hook rather
 * than a whole video, in `hook-ai-news-01`.
 */
export default defineVideo({
  id: 'hook-ai-news-03',
  assets: 'hook-ai-news',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 })],
  sections: [...hookSections({ hook: 'five-things' }), ...AI_NEWS_BODY],
})

import { FRAME_HEIGHT, FRAME_RATE, FRAME_WIDTH } from '../../config'
import { Section00, SECTION_00_FRAMES } from './Section00'
import { Section01, SECTION_01_FRAMES } from './Section01'
import { Section02, SECTION_02_FRAMES } from './Section02'
import { Section03, SECTION_03_FRAMES } from './Section03'
import { Section04, SECTION_04_FRAMES } from './Section04'
import { Section05, SECTION_05_FRAMES } from './Section05'
import { Section06, SECTION_06_FRAMES } from './Section06'
import { Section07, SECTION_07_FRAMES } from './Section07'
import { Section08, SECTION_08_FRAMES } from './Section08'
import { Section09, SECTION_09_FRAMES } from './Section09'
import { Section10, SECTION_10_FRAMES } from './Section10'
import { Section11, SECTION_11_FRAMES } from './Section11'
import { Section12, SECTION_12_FRAMES } from './Section12'
import { Section13, SECTION_13_FRAMES } from './Section13'
import { Section14, SECTION_14_FRAMES } from './Section14'
import { Section15, SECTION_15_FRAMES } from './Section15'
import { Section16, SECTION_16_FRAMES } from './Section16'
import { Section17, SECTION_17_FRAMES } from './Section17'
import { Section18, SECTION_18_FRAMES } from './Section18'

import { Composition, Folder } from 'remotion'

/**
 * The clips video 9 is built from, each one its own composition so it can be watched, re-timed
 * and re-rendered on its own.
 *
 * The composition id is the asset's filename without its extension, which is the contract
 * `scripts/render-clips.sh` relies on: what Studio shows is what lands in `public/`, and a clip
 * cannot be renamed in one place and not the other.
 *
 * Every duration here is the section's own slot in `timeline.json`. A clip that does not match
 * its slot is either cut off mid-move or holds a dead frame, and neither shows up until the whole
 * video is rendered.
 */
export const CLIPS = [
  { id: 'section-00-product-managers', component: Section00, durationInFrames: SECTION_00_FRAMES },
  { id: 'section-01-i-found-a-bug', component: Section01, durationInFrames: SECTION_01_FRAMES },
  { id: 'section-02-fewer-questions', component: Section02, durationInFrames: SECTION_02_FRAMES },
  {
    id: 'section-03-engineer-has-to-ask',
    component: Section03,
    durationInFrames: SECTION_03_FRAMES,
  },
  { id: 'section-04-where', component: Section04, durationInFrames: SECTION_04_FRAMES },
  { id: 'section-05-what-did-you-do', component: Section05, durationInFrames: SECTION_05_FRAMES },
  { id: 'section-06-can-you-repeat-it', component: Section06, durationInFrames: SECTION_06_FRAMES },
  { id: 'section-07-seven-answers', component: Section07, durationInFrames: SECTION_07_FRAMES },
  { id: 'section-08-repeat-it', component: Section08, durationInFrames: SECTION_08_FRAMES },
  { id: 'section-09-show-the-bug', component: Section09, durationInFrames: SECTION_09_FRAMES },
  { id: 'section-10-list-the-steps', component: Section10, durationInFrames: SECTION_10_FRAMES },
  { id: 'section-11-expected', component: Section11, durationInFrames: SECTION_11_FRAMES },
  { id: 'section-12-actual', component: Section12, durationInFrames: SECTION_12_FRAMES },
  { id: 'section-13-environment', component: Section13, durationInFrames: SECTION_13_FRAMES },
  { id: 'section-14-impact', component: Section14, durationInFrames: SECTION_14_FRAMES },
  {
    id: 'section-15-start-investigating',
    component: Section15,
    durationInFrames: SECTION_15_FRAMES,
  },
  { id: 'section-16-save-template', component: Section16, durationInFrames: SECTION_16_FRAMES },
  { id: 'section-17-failed-request', component: Section17, durationInFrames: SECTION_17_FRAMES },
  {
    id: 'section-18-follow-episode-two',
    component: Section18,
    durationInFrames: SECTION_18_FRAMES,
  },
]

export const Pm09ClipCompositions: React.FC = () => (
  <Folder name="pm-09-clips">
    {CLIPS.map((clip) => (
      <Composition
        key={clip.id}
        id={clip.id}
        component={clip.component}
        durationInFrames={clip.durationInFrames}
        fps={FRAME_RATE}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
      />
    ))}
  </Folder>
)

import type { VoiceSettings } from './definition'

/**
 * The ElevenLabs voices these videos have been narrated with. One const is the source of truth;
 * a definition names a voice and the id is looked up here.
 */
export const VOICE_IDS = {
  aria: '9BWtsMINqrJLrRacOk9x',
  beth: '8N2ng9i2uiUWqstgmWlH',
  chloe: 'lhgliD0TncfFOY1Nc93M',
  elizabeth: 'AXdMgz6evoL7OPd7eU12',
  lana: 'roYauZ4bOLAKvVZTPLre',
  lily: 'pFZP5JQG7iQjIQuC4Bku',
  nicole: 'iP95p4xoKVk53GoZ742B',
  sarah: 'EXAVITQu4vr4xnSDxMaL',
} as const

export type VoiceName = keyof typeof VOICE_IDS

export const isVoiceName = (name: string): name is VoiceName => name in VOICE_IDS

/** The delivery the existing narration was generated with. Changing these re-narrates everything. */
export const HOUSE_VOICE_SETTINGS: VoiceSettings = {
  stability: 0.5,
  similarity_boost: 0.75,
  speed: 1.1,
}

export const voiceIdFor = ({ voice }: { voice: string }): string => {
  if (!isVoiceName(voice)) {
    throw new Error(
      `Unknown voice "${voice}". Add its id to VOICE_IDS, or use one of: ` +
        `${Object.keys(VOICE_IDS).join(', ')}.`,
    )
  }
  return VOICE_IDS[voice]
}

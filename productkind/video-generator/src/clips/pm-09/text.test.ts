import { charsAcross, wrapText } from './text'

import { describe, expect, test } from 'vitest'

describe('charsAcross', () => {
  test('rounds down, so a line the estimate accepts always fits', () => {
    expect(charsAcross({ width: 498, size: 26, charWidth: 0.56 })).toBe(34)
  })

  test('keeps one character for a width too narrow for even that', () => {
    expect(charsAcross({ width: 2, size: 26, charWidth: 0.56 })).toBe(1)
  })
})

describe('wrapText', () => {
  test('fills a line to the budget and breaks before the word that would exceed it', () => {
    expect(wrapText({ text: 'one two three four', charsPerLine: 11 })).toEqual([
      'one two',
      'three four',
    ])
  })

  test('never breaks a word, even one wider than the line', () => {
    expect(wrapText({ text: 'a supercalifragilistic b', charsPerLine: 8 })).toEqual([
      'a',
      'supercalifragilistic',
      'b',
    ])
  })

  test('collapses the whitespace the copy happens to be written with', () => {
    expect(wrapText({ text: '  two   words  ', charsPerLine: 40 })).toEqual(['two words'])
  })

  test('has no lines for no text, so an empty field costs no height', () => {
    expect(wrapText({ text: '   ', charsPerLine: 40 })).toEqual([])
  })
})

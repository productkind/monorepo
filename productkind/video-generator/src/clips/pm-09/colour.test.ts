import { mixHex } from './colour'

import { describe, expect, test } from 'vitest'

describe('mixHex', () => {
  test('is the start colour at nothing', () => {
    expect(mixHex({ from: '#8efd23', to: '#d9d9e2', amount: 0 })).toBe('#8efd23')
  })

  test('is the end colour at everything', () => {
    expect(mixHex({ from: '#8efd23', to: '#d9d9e2', amount: 1 })).toBe('#d9d9e2')
  })

  test('meets in the middle', () => {
    expect(mixHex({ from: '#000000', to: '#ffffff', amount: 0.5 })).toBe('#808080')
  })

  test('keeps two digits per channel when a channel is small', () => {
    expect(mixHex({ from: '#000000', to: '#0f0f0f', amount: 1 })).toBe('#0f0f0f')
  })

  test('clamps rather than extrapolating past either end', () => {
    expect(mixHex({ from: '#000000', to: '#ffffff', amount: 4 })).toBe('#ffffff')
    expect(mixHex({ from: '#000000', to: '#ffffff', amount: -2 })).toBe('#000000')
  })

  test('refuses a colour it cannot read rather than drawing the wrong one', () => {
    expect(() => mixHex({ from: '#fff', to: '#000000', amount: 0.5 })).toThrow()
  })
})

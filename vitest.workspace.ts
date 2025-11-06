
export default [
  {
    test: {
      include: 'dungarees/src/**/*.test.{ts,tsx}',
      name: 'dungarees',
      setupFiles: ['./vitestSetup.ts'],
      exclude: ['dungarees/src/core/marbles.test.ts'], // It is jest implementation would fail in vitest
    },
  },
]

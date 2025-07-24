
export default [
  {
    test: {
      include: 'dungarees/src/**/*.test.{ts,tsx}',
      name: 'skid',
      setupFiles: ['./vitestSetup.ts'],
      exclude: ['dungarees/src/core/marbles.test.ts', 'skid/src/node_modules/**'], // It is jest implementation would fail in vitest
    },
  },
]

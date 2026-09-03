
export default [
  {
    test: {
      include: 'dungarees/src/**/*.test.{ts,tsx}',
      name: 'dungarees',
      exclude: ['dungarees/src/core/marbles.test.ts'], // jest implementation, needs a global expect
      setupFiles: ['./vitestSetup.ts'],
      typecheck: {
        enabled: true,
        tsconfig: './tsconfig.json',
        include: ['dungarees/src/**/*.test.{ts,tsx}'],
      },
    },
  },
]

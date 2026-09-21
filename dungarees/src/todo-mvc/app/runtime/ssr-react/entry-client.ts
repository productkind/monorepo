import { startBrowserApp } from './start.ts'

// Kept apart from start.ts because this file runs on import: the document names it as the client
// entry, while a test needs the hydration to be something it can call when it is ready.
startBrowserApp()

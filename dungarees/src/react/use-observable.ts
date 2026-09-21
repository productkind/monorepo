import { readSynchronousValue, type SynchronousValue } from '@dungarees/rxjs/util.ts'

import { useMemo, useSyncExternalStore } from 'react'
import type { Observable } from 'rxjs'

const requireSynchronousValue = <VALUE>(source$: Observable<VALUE>): SynchronousValue<VALUE> => {
  const snapshot = readSynchronousValue(source$)
  if (snapshot === undefined) {
    throw new Error('Observable did not emit a value synchronously')
  }
  return snapshot
}

const createSnapshotHolder = <VALUE>(
  source$: Observable<VALUE>,
): { subscribe: (onChange: () => void) => () => void; getSnapshot: () => VALUE } => {
  let snapshot = requireSynchronousValue(source$)

  return {
    subscribe: (onChange) => {
      // The source replays its current value on subscribe, and that replay is the value already
      // held. Recording it without announcing a change keeps React from re-rendering over a value
      // it is about to read anyway — useSyncExternalStore re-reads the snapshot after subscribing.
      let replayed = false
      const subscription = source$.subscribe((value) => {
        snapshot = { value }
        if (replayed) {
          onChange()
        }
        replayed = true
      })

      return () => {
        subscription.unsubscribe()
      }
    },
    getSnapshot: () => snapshot.value,
  }
}

// The same snapshot serves the server pass and the first browser pass, which is what makes the
// rendered HTML and the hydrated tree agree.
export const useObservableValue = <VALUE>(source$: Observable<VALUE>): VALUE => {
  const { subscribe, getSnapshot } = useMemo(() => createSnapshotHolder(source$), [source$])

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

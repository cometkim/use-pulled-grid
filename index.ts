import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react'
import debounce from 'lodash/debounce'

type PulledGridHookDebounceOption = {
  delay?: number;
  leading?: boolean;
  trailing?: boolean;
}

type PulledGridHookOption = {
  columnMinWidth: number;
  gridGap: number;
  debounce?: PulledGridHookDebounceOption;
}

type PulledGridHookOutput = {
  styles: {
    container: CSSProperties;
    itemWrapper: CSSProperties;
  };
}

export default function usePulledGrid({
  columnMinWidth,
  gridGap,
  debounce: debounceOption = {},
}: PulledGridHookOption): PulledGridHookOutput {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const { delay = 300, leading = false, trailing = true } = debounceOption
  const handleResize = useCallback(debounce(
    () => setWindowWidth(window.innerWidth), delay, { leading, trailing },
  ), [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const columns = useMemo(() => (
    Math.floor((windowWidth - gridGap) / (columnMinWidth + gridGap))
  ), [columnMinWidth, gridGap, windowWidth])

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridGap: `${gridGap}px`,
    gap: `${gridGap}px`,
  }

  const gridItemWrapperStyle = {
    // A fallback style for browsers which not supports grid-gap property yet.
    // See the [capability table](https://developer.mozilla.org/en-US/docs/Web/CSS/gap#Support_in_Grid_layout)
    minWidth: `calc(100% / ${columns} - ${gridGap}px * ${columns} - ${gridGap}px)`,
  }

  return {
    styles: {
      container: gridContainerStyle,
      itemWrapper: gridItemWrapperStyle,
    },
  }
}

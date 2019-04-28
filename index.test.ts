import { renderHook, act } from 'react-hooks-testing-library'
import usePulledGrid from './index'

jest.mock('lodash/debounce', () => (fn: any) => fn)

describe('usePulledGrid', () => {
  const baseProps = {
    columnMinWidth: 100,
    gridGap: 10,
  }

  it('should calculates style properties', () => {
    const { result } = renderHook(() => usePulledGrid(baseProps))

    // Default window.innerWidth is 1024px by Jest.
    expect(result.current.styles).toMatchObject({
      container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 1fr)',
        gridGap: '10px',
        gap: '10px',
      },
      itemWrapper: {
        minWidth: 'calc(100% / 9 - 10px * 9 - 10px)',
      },
    })
  })

  it('should re-calculates style properties on update', () => {
    const { result } = renderHook(() => usePulledGrid(baseProps))

    act(() => {
      // @ts-ignore
      window.innerWidth = 2048
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.styles).toMatchObject({
      container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(18, 1fr)',
        gridGap: '10px',
        gap: '10px',
      },
      itemWrapper: {
        minWidth: 'calc(100% / 18 - 10px * 18 - 10px)',
      },
    })
  })
})

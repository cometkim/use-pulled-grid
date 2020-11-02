# use-pulled-grid

[![NPM](https://img.shields.io/npm/v/use-pulled-grid.svg)](https://www.npmjs.com/package/use-pulled-grid)
[![Build Status](https://img.shields.io/circleci/project/github/cometkim/use-pulled-grid/master.svg)](https://circleci.com/gh/cometkim/use-pulled-grid)
[![Coverage](https://img.shields.io/codecov/c/github/cometkim/use-pulled-grid/master.svg)](https://codecov.io/gh/cometkim/use-pulled-grid)
[![License](https://img.shields.io/github/license/cometkim/use-pulled-grid.svg)](https://github.com/cometkim/use-pulled-grid/blob/master/LICENSE)

:warning: Wait, you don't need JS here! you can do this using **only CSS**

```css
grid-template-columns: repeat(auto-fit, minmax(--min-width, 1fr));
```

Use this code only when you need fallback styles.

----

A React hook provides responsive CSS Grid container

- [x] Calculate CSS properties for grid container to fit the current window width
- [ ] Get easier to use [animated-css-grid](https://github.com/aholachek/animate-css-grid)

## Live demo

See in [CodeSandbox](https://codesandbox.io/s/qqz0p8w784)

## Usage

### Inline style

```jsx
import React from 'react'

import usePulledGrid from 'use-pulled-grid'

const ProductCardList = ({ products }) => {
  const { styles } = usePulledGrid({
    columnMinWidth: 100, // Each grid items never get smaller than 100px
    gridGap: 10,
  })

  return (
    <div style={styles.container}>
      {products.map(product => (
        {/* Wrappers to each child are required for css-animated-grid and fallback style of grid gap */}
        <div key={product.id} style={styles.itemWrapper}>
            <ProductCard {...product}/>
        </div>
      )}
    </div>
  )
}
```

### emotion

```jsx
import React from 'react'
import { css } from '@emotion/core'

import usePulledGrid from 'use-pulled-grid'

const ProductCardList = ({ products }) => {
  const { styles } = usePulledGrid({
    columnMinWidth: 100,
    gridGap: 10,
  })

  const container = React.useMemo(() => (
    css(styles.container)
  ), [styles.container])

  const itemWrapper = React.useMemo(() => (
    css(styles.itemWrapper)
  ), [styles.itemWrapper])

  return (
    <Container className={container}>
      {products.map(product => (
        <ItemWrapper key={product.id} className={itemWrapper}>
          <ProductCard {...product}/>
        </ItemWrapper>
      )}
    </Container>
  )
}
```

## Changelog

### v1.1.0

- Cleanup codes
- Make test coverage 100%

## License

MIT

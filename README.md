# use-pulled-grid

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
        <div key={`product-card-wrapper_${product.id}`} style={styles.itemWrapper}>
            <ProductCard {...product}/>
        </div>
      )}
    </div>
  )
}
```

### Animated + styled-components

TODO

## License

MIT

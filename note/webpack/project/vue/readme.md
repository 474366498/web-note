

#### Module not found: Error: Can't resolve './router/index' in 'E:\web-note\note\webpack\project\vue\src'

``` javascript 
...(webpack.config)
 resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },


```
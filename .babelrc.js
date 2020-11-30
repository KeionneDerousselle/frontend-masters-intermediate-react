module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-env',
    [
      '@emotion/babel-preset-css-prop',
      { sourceMap: false }
    ]
  ],
  plugins: [
    'transform-inline-environment-variables',
    '@babel/plugin-proposal-class-properties'
  ]
}


// module.exports = {
//   presets: [
//     [
//       '@babel/preset-react',
//       { runtime: 'automatic', importSource: '@emotion/react' }
//     ],
//     '@babel/preset-env',
//     // '@emotion/babel-preset-css-prop'
//   ],
//   plugins: ['@babel/plugin-proposal-class-properties', '@emotion/babel-plugin']
// }

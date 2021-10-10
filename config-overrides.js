module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            ie: '11',
          },
        }], 
        '@babel/preset-react',
        '@babel/preset-typescript'
      ],
      plugins: [
        "@babel/plugin-proposal-nullish-coalescing-operator",
        'react-require'
      ],
    },
    exclude: /node_modules\/(?!(@cig-platform)\/)/i,
  });
  
  return config;
}
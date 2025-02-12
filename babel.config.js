module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@styles': './src/styles',
        },
      },
    ],
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv'],
  ],
};

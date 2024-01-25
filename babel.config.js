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
          '@utills': './src/utills',
          '@hooks': './src/hooks',
          '~api': './src_toss/api',
          '~assets': './src_toss/assets',
          '~components': './src_toss/components',
          '~navigations': './src_toss/navigations',
          '~screens': './src_toss/screens',
          '~utills': './src_toss/utills',
          '~hooks': './src_toss/hooks/',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

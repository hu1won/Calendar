// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      // react/jsx-runtime 해결 문제 수정
      webpackConfig.resolve.extensionAlias = {
        '.js': ['.js', '.ts', '.tsx'],
        '.jsx': ['.jsx', '.tsx'],
      };
      return webpackConfig;
    },
  },
};


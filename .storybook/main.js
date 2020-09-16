const path = require("path");
const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../src/components');
module.exports = {
  stories: ['../src/components/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    // do mutation to the config
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [SRC_PATH, STORIES_PATH],
        use: [
          {
            loader: require.resolve("ts-loader"),
          },
          { loader: require.resolve("react-docgen-typescript-loader") }
        ]
    });
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};

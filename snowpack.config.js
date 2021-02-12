// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    "src": "/"
  },
  devOptions: {
    secure: true,
  },
  plugins: [
    [
      "@snowpack/plugin-babel",
      {
        "input": ['.js', '.mjs', '.jsx', '.ts', '.tsx'], // (optional) specify files for Babel to transform
        transformOptions: {
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-private-methods",
            "@babel/plugin-proposal-private-property-in-object",
          ]
        }
      }
    ]
  ]
};

const path = require("path");
const withTM = require("next-transpile-modules")(["antd-mobile"]);

const nextConfig = withTM({
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: false,
  images: {
    domains: ["smartoffice.mobifone.vn"],
  },
  output: "standalone",
});

module.exports = nextConfig;

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest:'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

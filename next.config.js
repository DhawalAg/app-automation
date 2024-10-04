/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {};

export default config;

// module.exports = {
//     async rewrites() {
//       return [
//         {
//           source: '/api/:path*',
//           destination: 'http://127.0.0.1:5328/:path*', // Proxy to Backend
//         },
//       ]
//     },
//   }
const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: process.env._next_intl_trailing_slash === 'true', // Use the environment variable
  env: {
    _next_intl_trailing_slash: process.env._next_intl_trailing_slash || 'false', // Default to 'false' if not provided
  }
};
 
module.exports = withNextIntl(nextConfig);
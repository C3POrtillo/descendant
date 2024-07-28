module.exports = {
  env: {
    WEAPON_JSON: process.env.WEAPON_JSON,
    MODULE_JSON: process.env.MODULE_JSON,
    STAT_JSON: process.env.STAT_JSON
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'open.api.nexon.com',
        port: '',
        pathname: '/static/tfd/**',
      },
    ]
  }
}

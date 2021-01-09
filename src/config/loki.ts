export const loki = {
  host: process.env.LOKI_HOST || 'http://loki:3100',
  level: process.env.LOKI_LEVEL || 'debug', // 默认 level
}

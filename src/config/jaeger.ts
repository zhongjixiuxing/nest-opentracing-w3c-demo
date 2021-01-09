export const jaeger = {
  host: process.env.JAEGER_HOST || 'jaegertracing',
  port: process.env.JAEGER_PORT || 6832,
}

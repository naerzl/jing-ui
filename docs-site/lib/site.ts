export const site = {
  name: 'jing/ui',
  github: 'https://github.com/naerzl/jing-ui',
  demo:
    process.env.NEXT_PUBLIC_DEMO_URL ??
    (process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:5173/'
      : `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/`),
}

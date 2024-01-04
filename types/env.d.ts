declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'production' | 'dev'
      readonly PORT: string
      readonly JWT_SECRET: string
    }
  }
}

export { }

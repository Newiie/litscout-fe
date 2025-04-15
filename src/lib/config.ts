export const apiUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' 
  ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL 
  : process.env.NEXT_PUBLIC_PRODUCTION_URL
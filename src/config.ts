const BASE_URL_DEV = "https://api.digithane.tech"
// const BASE_URL_DEV = "http://localhost:4201"

// const BASE_URL_PROD = "https://digithane-api.onrender.com"
const BASE_URL_PROD = "https://api.digithane.tech"
const environment = process.env.NODE_ENV || 'development';
export const BASE_URL = environment === 'production' ? BASE_URL_PROD : BASE_URL_DEV;
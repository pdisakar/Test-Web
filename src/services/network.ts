import axios, { AxiosInstance, AxiosResponse } from 'axios';

const PRODUCTION_SERVER: string | undefined = process.env.PRODUCTION_SERVER;
const DEVELOPMENT_SERVER: string | undefined = process.env.DEVELOPMENT_SERVER;
const SITE_KEY: string | undefined = process.env.SITE_KEY;

if (
  (process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'production') &&
  SITE_KEY
) {
  axios.defaults.headers.common['siteKey'] = SITE_KEY;
}

const client: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? PRODUCTION_SERVER
      : DEVELOPMENT_SERVER,
});

export default client;

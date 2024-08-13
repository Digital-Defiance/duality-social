import { dirname } from 'path';
import { IEnvironment } from './interfaces/environment';
import 'dotenv/config'
import { randomBytes } from 'crypto';

const host = process.env.SERVER_HOST ?? 'localhost';
const port = Number(process.env.PORT ?? 3000);
const production = process.env.NODE_ENV === 'production';

function getServerUrl() {
  if (port === 80) {
      return `http://${host}`;
  } else {
      return `http://${host}:${port}`;
  }
}

export const environment: IEnvironment = {
  production: production,
  serverUrl: process.env.SITE_URL ?? getServerUrl(),
  emailSender: process.env.EMAIL_SENDER ?? 'noreply@duality.social',
  jwtSecret: process.env.JWT_SECRET ?? randomBytes(32).toString('hex'),
  jwtExpiration: process.env.JWT_EXPIRATION ?? '1h',
  sendgridKey: process.env.SENDGRID_API_KEY ?? '',
  developer: {
    reactDir: dirname(dirname(__filename)) + '/duality-social-react/',
    host: host,
    port: port,
  },
  openai: {
    type: process.env.OPENAI_PROVIDER === 'azure' ? 'azure' : 'openai',
    accessToken: process.env.OPENAI_API_KEY ?? '',
    organization: process.env.OPENAI_ORGANIZATION
      ? process.env.OPENAI_ORGANIZATION
      : undefined,
    model: process.env.OPENAI_MODEL ? process.env.OPENAI_MODEL : 'gpt-4',
    deployment: process.env.OPENAI_DEPLOYMENT
      ? process.env.OPENAI_DEPLOYMENT
      : undefined,
  },
  mongo: {
    uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/duality-social',
  },
  cookies: {
    enabled: process.env.COOKIE_ENABLED === 'true',
    /**
     * arbitrarily generated string, arbitrarily 100 characters long
     */
    secret: process.env.EXPRESS_SESSION_SECRET ?? '',
  },
};

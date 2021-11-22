// Credits: https://github.com/leerob/leerob.io/blob/main/lib/google.ts
import { google } from 'googleapis';
import fs from 'fs';

const doesServiceAccountExist = (): boolean => {
  return fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS!);
};

const googleAuth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  // If the service account file exists (ex. local development) we don't have to include it due to default environment variable pointing to the absolute file path
  // If the service account file doesn't exist (ex. production), then we need to parse the environment variable to get the credentials stored in Vercel
  credentials:
    !doesServiceAccountExist() &&
    JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!),
});

export default googleAuth;

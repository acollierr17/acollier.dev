// Credits: https://github.com/leerob/leerob.io/blob/main/lib/google.ts
import { google } from 'googleapis';

const googleAuth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
});

export default googleAuth;

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  secret: process.env.SECRET,
  database: {
    type: "postgres",
    url: process.env.DATABASE_URI,
    ssl: {
      rejectUnauthorized: false
    }
  }
  // database: process.env.DATABASE_URI,
});
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://bazar-dor-a07-seven.vercel.app",
});

export const {
  signIn,
  signUp,
  signOut,
  updateUser,
  useSession,
} = authClient;
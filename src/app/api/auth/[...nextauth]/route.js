import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // callbacks: {
  //   async signIn(user, account, profile) {
  //     if (user.email && user.email.endsWith("@pistonbleu.fr")) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

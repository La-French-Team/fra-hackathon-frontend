import NextAuth from "next-auth";
import ZitadelProvider from "next-auth/providers/zitadel";

export const authOptions = {
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.idToken = token.idToken;

      return session;
    },
  },
  providers: [
    {
      ...ZitadelProvider({
        issuer: process.env.ZITADEL_ISSUER,
        clientId: process.env.ZITADEL_CLIENT_ID,
        clientSecret: process.env.ZITADEL_CLIENT_SECRET,
      }),
      name: "ONE Record SSO",
    },
  ],
};
export default NextAuth(authOptions);

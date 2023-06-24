import NextAuth from "next-auth";
import ZitadelProvider from "next-auth/providers/zitadel";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    {
      ...ZitadelProvider({
        issuer: process.env.ZITADEL_ISSUER,
        clientId: process.env.ZITADEL_CLIENT_ID,
        clientSecret: process.env.ZITADEL_CLIENT_SECRET,
      }),
      name: "ONE Record SSO",
    },
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);

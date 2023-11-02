import spotifyApi from "@/lib/spotify"
import { LOGIN_URL } from "@/lib/spotify"
import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

async function refreshAccessToken(token){
  try{
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const {body:refreshedtoken} = await spotifyApi.refreshAccessToken();
    console.log("REFRESHED TOKEN IS", refreshedtoken);
    return{
      ...token,
      accessToken: refreshedtoken.access_token,
      accessTokenExpires:Date.now +refreshedtoken.expires_in*1000,
      refreshToken: refreshedtoken.refresh_token ?? token.refreshToken,

    }
  }catch(error){
    console.error(error)
    return{
      ...token,
      error:"RefreshAccessTokenError",
    }
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,

    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({token,account,user}){
      if (account && user){
        return{
          ...token,
          accessToken :account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires : account.expires_at *1000,
        }
      }
      if(Date.now()< token.accessTokenExpires){
        console.log("access token is valid")
        return token;
      }

      console.log("access token is not valid");
      return await refreshAccessToken(token)

    },
    async session({session,token}){
      session.user.accessToken =token.accessToken;
      session.user.refreshToken =token.refreshToken;
      session.user.username =token.username;

      return session;


    },


  },
};

export default NextAuth(authOptions)
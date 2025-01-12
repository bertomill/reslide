import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn() {
      return true
    },
    async redirect({ url, baseUrl }) {
      // After sign in, redirect to onboarding
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/onboarding`
      }
      return url
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
})

export { handler as GET, handler as POST } 
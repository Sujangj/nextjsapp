declare module 'next-auth' {
  export type NextAuthOptions = any;
  export type Session = any;
  export type User = any;
  const NextAuth: any;
  export default NextAuth;
}

declare module 'next-auth/providers/credentials' {
  const CredentialsProvider: any;
  export default CredentialsProvider;
}

import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import dbConnect from "@/app/lib/dbConnect"
import UserModel from "@/app/model/User.model"
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const identifier = credentials?.email
                    const user = await UserModel.findOne({
                        $or: [
                            { email: identifier },
                            { username: identifier }
                        ]
                    })
                    if (!user) {
                        throw new Error("No user found with the given email or username")
                    }

                    if(!user.isVerified){
                        throw new Error("User is not verified. Please verify your email before logging in.")
                    }
                    const isPasswordValid = await bcrypt.compare(credentials?.password ?? '', user.password)
                    if (isPasswordValid) {
                        return user
                    } else {
                        throw new Error("Invalid password")
                    }
                    
                } catch (err: any) {
                    throw new Error(err?.message ?? String(err))
                }

            }
        })

    ]
}
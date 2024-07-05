import Image from "next/image"
import Head from "next/head"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import Loading from "@/components/Loading"
export default function Auth() {

    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === 'loading') {
        return <Loading />
    }

    if (session) {
        router.push('/profile')
        return null
    }

    return <>
        <Head>
            <title>Movie App | Backend</title>
        </Head>

        <div className="container">
            <div className="loginfront flex flex-center">
                <div className="loginbox flex flex-col">
                    <Image src='/img/coder.png' width={150} height={150} />
                    <h2>Welcome Admin of the makmovies</h2>
                    <p>Visit our main website <a href="https://vbmcoder.in/">VBMCODER</a></p>
                    {session ? <button onClick={signOut}>Logout</button> : <button onClick={signIn}>Login</button>}
                </div>
            </div>
        </div>
    </>
}
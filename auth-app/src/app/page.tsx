import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import LoginButton from "./loginbutton";


export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex items-center justify-center h-screen bg-cover bg-center bg-[url('/images/glowing.webp')] text-black">
      <div className="text-center bg-opacity-60 p-8 rounded-xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to AuthApp</h1>
        <p className="text-lg mb-6 text-black">Please login to access your dashboard</p>
       <LoginButton/>
      </div>
    </main>
  );
}

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import Dashboard from "../components/dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  return <Dashboard user={session.user} />;
}

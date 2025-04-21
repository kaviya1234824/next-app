"use client";
import { useCallback, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Dashboard = ({ user }: any) => {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfileData(data);
      } else {
        console.error("Failed to fetch profile");
      }
    };

  const handleViewProfile = async () => {
    if (!profileData) await fetchProfile();
    setIsOpen(true);
  };

  const handleLogout = () => {
    const tenantDomain = process.env.NEXT_PUBLIC_AUTHACTION_TENANT_DOMAIN;
    const postLogoutRedirectUri = `${window.location.origin}`;

    if (!tenantDomain || !session?.idToken) {
      return;
    }
    const logoutUrl = `https://${tenantDomain}/oauth2/logout?id_token_hint=${session.idToken}&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;
    signOut({
      redirect: false,
    }).then(() => {
      window.location.href = logoutUrl;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold"> Auth Dashboard</h1>
          <nav className="flex gap-6">
            <a href="#" className="text-blue-600 hover:underline">Home</a>
            <a href="#" className="text-blue-600 hover:underline">Settings</a>
            <a href="#" className="text-blue-600 hover:underline">About</a>
          </nav>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-center align-center">
        <h2 className="text-xl font-semibold mb-4">Welcome back, {user?.name}</h2>
        </div>
        <Dialog onOpenChange={(open) => open && handleViewProfile()}>
          <DialogTrigger asChild>
          <div className="flex justify-center align-center">
            <button className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow">
              View Profile Info
            </button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Profile Details</DialogTitle>
              <DialogDescription>Here is your protected user data.</DialogDescription>
            </DialogHeader>
            {profileData ? (
              <div className="mt-4 space-y-2 text-sm text-gray-800">
                <p><span className="font-medium">Name:</span> {profileData?.user?.name}</p>
                <p><span className="font-medium">Email:</span> {profileData?.user?.email}</p>
              </div>
            ) : (
              <p className="text-gray-500">Loading profile data…</p>
            )}
          </DialogContent>
        </Dialog>
        <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Image
              src="/images/istockphoto.jpg"
              alt="Cybersecurity"
              width={400}
              height={250}
              className="rounded-t-lg object-cover h-40"
            />
            <div className="p-4">
              <p className="text-lg font-semibold mb-4">
                "Authentication is the first line of defense against cyber threats."
              </p>
              <p className="text-sm text-gray-600">
                - Auth
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Image
              src="/images/istockphoto2.jpg"
              alt="Cybersecurity"
              width={400}
              height={250}
              className="rounded-t-lg object-cover h-40"
            />
            <div className="p-4">
              <p className="text-lg font-semibold mb-4">
                "Without strong authentication, even the best security is useless."
              </p>
              <p className="text-sm text-gray-600">
                - Auth
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Image
              src="/images/add-to-cart.webp"
              alt="Cybersecurity"
              width={400}
              height={250}
              className="rounded-t-lg object-cover h-40"
            />
            <div className="p-4">
              <p className="text-lg font-semibold mb-4">
                "Your password is the key to your kingdom; make sure it's strong."
              </p>
              <p className="text-sm text-gray-600">
                - Auth
              </p>
            </div>
          </div>
        </section>
        </main>
    </div>
  );
};

export default Dashboard;

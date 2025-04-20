"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

const Dashboard = ({ user }: any) => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfileData(data);
      } else {
        console.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold mb-4">Welcome back, {user?.name}</h2>
        <p>Your email: {user?.email}</p>

        {profileData && (
          <div className="mt-6 p-4 bg-white rounded-xl shadow">
            <h3 className="text-lg font-medium mb-2">Protected Data</h3>
            <pre className="text-sm text-gray-700">{JSON.stringify(profileData, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

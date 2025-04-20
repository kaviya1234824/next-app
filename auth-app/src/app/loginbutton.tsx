"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("authaction", { callbackUrl: "/dashboard" })}
      className="px-6 py-3 bg-black hover:bg-blue-700 text-white rounded-lg shadow-lg"
    >
      Login
    </button>
  );
}

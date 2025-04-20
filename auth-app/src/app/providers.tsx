"use client";

import React, { JSX, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}

"use client";

import UserProvider from "@/context/userContexts";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;

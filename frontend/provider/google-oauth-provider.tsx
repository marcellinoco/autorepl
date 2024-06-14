"use client";

import { GoogleOAuthProvider as Google } from "@react-oauth/google";
import React from "react";

interface GoogleOauthProviderProps {
  children: React.ReactNode;
}

export default function GoogleOAuthProvider({
  children,
}: GoogleOauthProviderProps) {
  return (
    <Google clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}>
      {children}
    </Google>
  );
}

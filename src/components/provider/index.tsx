'use client'
import React from "react";
import UiLayoutProvider from "./uiLayoutProvider";
import AuthGuard from "./AuthGuard";
import { ReduxProvider } from "./ReduxProvider";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div> 
       <ReduxProvider>
      <AuthGuard>      
        <UiLayoutProvider>{children}</UiLayoutProvider>
      </AuthGuard>
      </ReduxProvider>
    </div>
  );
};

export default RootProvider;

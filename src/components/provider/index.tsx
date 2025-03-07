import React from "react";
import UiLayoutProvider from "./uiLayoutProvider";
import AuthGuard from "./AuthGuard";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AuthGuard>
        <UiLayoutProvider>{children}</UiLayoutProvider>
      </AuthGuard>
    </div>
  );
};

export default RootProvider;

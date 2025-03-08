"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loading from "../common/loading";
import axios from "axios";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(false);
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setIsAuthenticated(res?.data?.authenticated);
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathName]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && pathName !== "/auth/login" && pathName !== "/auth/signup") {
        router.push("/auth/login");
      } else if (isAuthenticated && (pathName === "/auth/login" || pathName === "/auth/signup")) {
        router.push("/backlog");
      }
    }
  }, [pathName, isAuthenticated, isLoading]);

  if (isLoading) return <Loading />;

  return <>{children}</>;
}

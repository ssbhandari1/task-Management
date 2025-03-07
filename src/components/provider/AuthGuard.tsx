'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import Loading from "../common/loading";
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token && pathName !== "/auth/login" && pathName !== "/auth/signup") {
      router.push("/auth/login");
    } else if (token && (pathName === "/auth/login" || pathName === "/auth/signup")) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [pathName]);

  if (isLoading) return <Loading/>;

  return <>{children}</>;
}

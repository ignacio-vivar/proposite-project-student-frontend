"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout, isAuthenticated, isLoading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <div className="py-2 px-2 absolute right-0">
        <Link href={"/"}>
          <Button onClick={() => logout()} className="m-2 p-5">
            Salir
          </Button>
        </Link>
      </div>

      <main>{children}</main>
    </div>
  );
}

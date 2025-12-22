import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <Suspense fallback={null}>
        <LoginClient />
      </Suspense>
    </div>
  );
}

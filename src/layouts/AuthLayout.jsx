import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-watfil-background-gray px-4 py-10">
      <div className="absolute -top-24 start-10 size-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-28 end-8 size-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute inset-x-0 top-1/3 h-px bg-(--watfil-gradient-primary) opacity-20" />

      <div className="relative z-10 w-full max-w-(--watfil-width-auth-card)">
        <Outlet />
      </div>
    </main>
  );
}

import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { CursorSparks } from "../components/ui/CursorSparks";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex flex-col text-[#F5F1F2] antialiased">
      <CursorSparks />
      <Navbar activeSection="" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-32 text-center relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(242,13,69,0.15)] text-[#FF315B] border border-[rgba(242,13,69,0.3)] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(242,13,69,0.3)]">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: "12s" }} />
        </div>
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#F20D45] uppercase mb-2">
          ERROR 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F5F1F2] mb-3">
          PAGE NOT FOUND
        </h1>
        <p className="text-sm text-[#A79BA0] max-w-md mb-8 leading-relaxed">
          The requested page could not be located. It may have moved or the address may have been mistyped.
        </p>
        <Link to="/">
          <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
            BACK TO HOME
          </Button>
        </Link>
      </main>

      <Footer />
    </div>
  );
}

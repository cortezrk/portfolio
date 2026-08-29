import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with care.
        </p>
        <p className="font-mono text-xs">
          designed & developed by{" "}
          <span className="text-gradient">cortez.dev</span>
        </p>
      </div>
    </footer>
  );
}

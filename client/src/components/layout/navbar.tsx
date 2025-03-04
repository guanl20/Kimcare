import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/">
          <a className="mr-8 flex items-center space-x-2">
            <span className="text-xl font-bold">MindfulCare</span>
          </a>
        </Link>
        <div className="flex items-center justify-between flex-1">
          <div className="flex gap-6 md:gap-10">
            <Link href="/resources">
              <a className="text-sm font-medium transition-colors hover:text-primary">
                Resources
              </a>
            </Link>
            <Link href="/volunteer">
              <a className="text-sm font-medium transition-colors hover:text-primary">
                Volunteer
              </a>
            </Link>
            <Link href="/partners">
              <a className="text-sm font-medium transition-colors hover:text-primary">
                Partners
              </a>
            </Link>
          </div>
          <Link href="/donate">
            <Button variant="default">Donate Now</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Footer component containing organization information, links, and contact details
import { Link } from "wouter";

export default function Footer() {
  return (
    // Main footer container with subtle background
    <footer className="border-t py-8 bg-muted/50">
      <div className="container px-4">
        {/* Grid layout for footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Organization description section */}
          <div>
            <h3 className="font-semibold mb-4">KIMCARE</h3>
            <p className="text-sm text-muted-foreground">
              Supporting mental health awareness and wellbeing in our community.
            </p>
          </div>

          {/* Quick links navigation section */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources">
                  <a className="hover:text-primary">Resources</a>
                </Link>
              </li>
              <li>
                <Link href="/volunteer">
                  <a className="hover:text-primary">Volunteer</a>
                </Link>
              </li>
              <li>
                <Link href="/partners">
                  <a className="hover:text-primary">Partners</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact information section */}
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@kimcare.org</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>

          {/* Social media links section */}
          <div>
            <h4 className="font-medium mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {/* TODO: Add social media icons and links */}
            </div>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} KIMCARE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
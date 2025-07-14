import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-foreground">
          TravelApp
        </Link>
        <nav className="flex space-x-4">
          <span className="text-muted-foreground">Navigation placeholder</span>
        </nav>
      </div>
    </header>
  );
};
import { Link } from "react-router-dom";

function Layout() {
  return (
    <nav className="flex gap-6 p-4 bg-secondary">
      <Link to="/" className="hover:text-accent">Home</Link>
    </nav>
  );
}

export default Layout;
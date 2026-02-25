import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">User Management</h1>
      <nav className="flex gap-4">
        <Link to="/" className="hover:underline">
          Users
        </Link>
        <Link to="/addusers" className="hover:underline">
          Add User
        </Link>
      </nav>
    </header>
  );
}
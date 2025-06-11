import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:underline">Dashboard</Link></li>
        <li><Link to="/form" className="hover:underline">Form</Link></li>
      </ul>
    </nav>
  );
}

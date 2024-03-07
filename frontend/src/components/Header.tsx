import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">BookingClone.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/"
            className="flex bg-white cursor-pointer items-center px-3 font-bold text-blue-600 hover:bg-gray-100"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
}

import { Link } from "react-router";

function Navbar() {
  return (
    <>
      <nav>
        <ul className="flex gap-3 items-center p-2 bg-black text-white">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

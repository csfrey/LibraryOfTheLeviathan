import "./App.css";
import AppLogo from "./assets/AppLogo";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useAuth } from "./hooks/auth";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotAuthorized from "./pages/NotAuthorized";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

function App() {
  const { user, setPreviousPage, logout } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow px-8 py-4 flex justify-between">
          <Link to="/" className="flex items-center gap-2">
            <AppLogo />
            <h1 className="font-brand text-2xl">Library of the Leviathan</h1>
          </Link>
          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center p-2 rounded hover:bg-gray-50">
                  {user.name}
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-2">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/">Favorites</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button type="button" onClick={() => logout?.mutate()}>
                      Log out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setPreviousPage(window.location.href)}
                  className="text-red-500 hover:text-red-700"
                >
                  sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setPreviousPage(window.location.href)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  register
                </Link>
              </>
            )}
          </div>
        </header>
        <main className="px-24 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/not-authorized" element={<NotAuthorized />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

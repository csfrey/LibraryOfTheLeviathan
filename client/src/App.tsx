import "./App.css";
import AppLogo from "./assets/AppLogo";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
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
import AdminConsole from "./pages/AdminConsole";
import Collection from "./pages/Collection";
import Ingester from "./pages/Ingester";
import { useAuth } from "@/hooks/auth";
import Home from "./pages/Home";

function App() {
  const { user, logout, setPreviousPage } = useAuth();

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
                  <DropdownMenuItem onClick={() => logout()}>
                    Log out
                  </DropdownMenuItem>
                  {user.role === "editor" || user.role === "admin" ? (
                    <DropdownMenuSeparator />
                  ) : null}
                  {user.role === "editor" || user.role === "admin" ? (
                    <DropdownMenuItem>
                      <Link to="/ingest">Ingester</Link>
                    </DropdownMenuItem>
                  ) : null}
                  {user.role === "admin" ? (
                    <DropdownMenuItem>
                      <Link to="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  ) : null}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    setPreviousPage(window.location.pathname);
                  }}
                >
                  sign in
                </Link>
                <Link
                  to="/register"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    setPreviousPage(window.location.pathname);
                  }}
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
            <Route path="/admin" element={<AdminConsole />} />
            <Route path="/collection/:name" element={<Collection />} />
            <Route path="/ingest" element={<Ingester />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Categories from "./components/admin/categories";
import Events from "./components/admin/events";
import Users from "./components/admin/users";
import EventsList from "./components/eventslist";
import Contact from "./components/admin/contact";
import Packages from "./components/admin/packages";
import Orders from "./components/admin/appointments";
import HomeSection from "./components/admin/home";
import "./App.css";
import "./bootstrap.css";
import "./responsive.css";

function App() {
  const user = localStorage.getItem("token");
  const getUserData = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  return (
    <Routes>
      {" "}
      {user && (
        <Route path="/" element={<Navigate replace to="/home" />} />
      )}{" "}
      <Route path="/" element={<Navigate replace to="/login" />} />{" "}
      <Route path="/home" element={<HomeSection />} />{" "}
      <Route path="/packages" element={<Dashboard />} />{" "}
      {user && (
        <Route path="/login" element={<Navigate replace to="/home" />} />
      )}{" "}
      <Route path="/login" element={<Login />} />{" "}
      <Route path="/signup" element={<Signup />} />{" "}
      {getUserData() &&
        (getUserData().usertype === 1 || getUserData().usertype === 2) && (
          <Route path="/categories" element={<Categories />} />
        )}{" "}
      <Route path="/categories" element={<Navigate replace to="/home" />} />{" "}
      {getUserData() &&
        (getUserData().usertype === 1 || getUserData().usertype === 2) && (
          <Route path="/events" element={<Events />} />
        )}{" "}
      <Route path="/events" element={<Navigate replace to="/home" />} />{" "}
      {getUserData() &&
        (getUserData().usertype === 1 || getUserData().usertype === 2) && (
          <Route path="/announcements" element={<Events />} />
        )}{" "}
      <Route path="/eventslist" element={<EventsList />} />{" "}
      {getUserData() && getUserData().usertype === 1 && (
        <Route path="/users" element={<Users />} />
      )}{" "}
      <Route path="/users" element={<Navigate replace to="/home" />} />{" "}
      <Route path="/admin/advisors" element={<Contact />} />{" "}
      {getUserData() &&
        (getUserData().usertype === 1 || getUserData().usertype === 2) && (
          <Route path="/newpackages" element={<Packages />} />
        )}{" "}
      <Route path="/newpackages" element={<Packages />} />{" "}
      <Route path="/admin/orders" element={<Orders />} />{" "}
    </Routes>
  );
}

export default App;

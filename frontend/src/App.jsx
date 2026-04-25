import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Logs from "./pages/Logs";
import Scheduled from "./pages/Scheduled";
import Layout from "./components/Layout";
import Platforms from "./pages/Platforms";
import Media from "./pages/Media";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES WITH LAYOUT */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/create"
          element={
            <Layout>
              <CreatePost />
            </Layout>
          }
        />

        <Route
          path="/scheduled"
          element={
            <Layout>
              <Scheduled />
            </Layout>
          }
        />

        <Route
          path="/logs"
          element={
            <Layout>
              <Logs />
            </Layout>
          }
        />
        <Route
          path="/platforms"
          element={
            <Layout>
              <Platforms />
            </Layout>
          }
        />
        <Route
          path="/media"
          element={
            <Layout>
              <Media />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
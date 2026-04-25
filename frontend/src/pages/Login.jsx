import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log(data);

      if (res.ok && !data.error) {
        alert("Login Successful");
        navigate("/dashboard");
      } else {
        alert("Invalid Credentials");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 text-white">

        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-gray-200 text-white outline-none focus:ring-2 focus:ring-blue-300"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-white/20 placeholder-gray-200 text-white outline-none focus:ring-2 focus:ring-blue-300"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-gray-200">
          Powered by AI SaaS 🚀
        </p>

      </div>

    </div>
  );
}
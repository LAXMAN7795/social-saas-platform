import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log(data);

      if (res.ok && !data.error) {
        alert("Signup successful ✅");
        navigate("/login");
      } else {
        alert("Signup failed ❌");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500">

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96 text-white">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-gray-200 text-white outline-none focus:ring-2 focus:ring-white/50"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-white/20 placeholder-gray-200 text-white outline-none focus:ring-2 focus:ring-white/50"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-gray-200">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-white">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}
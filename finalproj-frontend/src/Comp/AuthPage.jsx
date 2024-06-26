import React, { useContext, useState } from "react";
import axios from "../axiosConifg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { toast } from "sonner";

const AuthPage = () => {
  const { setUser } = useUser();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = (
        await axios.post("/auth/login", { email: emailOrPhone, password })
      ).data;
      localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response.data);
      toast.error("Error logging in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black font-agrandir placeholder:text-black">
      <main className="text-center p-6 w-full max-w-md bg-white bg-opacity-50 rounded-lg shadow-lg">
        <form
          onSubmit={handleSignIn}
          className="bg-white bg-opacity-0 p-8 rounded-lg  max-w-sm mx-auto font-agrandir"
        >
          <input
            type="text"
            placeholder="Enter your email or phone number"
            className="w-full mb-4 p-2 border-b-2 border-gray-300 rounded bg-transparent text-black focus:outline-none focus:border-blue-300 placeholder:text-slate-800"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mb-4 p-2 border-b-2 border-gray-300 rounded bg-transparent text-black focus:outline-none focus:border-blue-300 placeholder:text-slate-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
          <a
            href="/forgot-password"
            className="inline-block mt-4 text-black transition-all duration-150 hover:scale-105"
          >
            Forgot Password?
          </a>
          <a
            href="/signup"
            className="inline-block mt-2 text-black transition-all duration-150 hover:scale-105"
          >
            Don't have an Account yet?
          </a>
        </form>
      </main>
    </div>
  );
};

export default AuthPage;

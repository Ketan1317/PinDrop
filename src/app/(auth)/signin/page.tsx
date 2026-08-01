"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { michroma } from "../../layout";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";

export default function Page() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email: trimmedEmail,
      password: trimmedPassword,
    });

    if (res?.error) setError(res.error);
    setLoading(false);
  };

  useEffect(() => {
    console.log("session:", session);
    console.log("status:", status);
  }, [session, status]);

  if (status === "loading") {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-white/10"></div>
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-cyan-400 border-r-purple-500 animate-spin"></div>
        </div>

        {/* Brand */}
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          PinDrop
        </h1>

        {/* Loading Text */}
        <p className="text-gray-400 text-lg animate-pulse tracking-wide">
          Preparing your workspace...
        </p>

        {/* Progress Bar */}
        <div className="w-72 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(250%);
          }
        }
      `}</style>
    </div>
  );
}

  return (
    <div className="min-h-screen flex items-center justify-center gap-40 px-6 text-white">
      <div
        className={`${michroma.className} text-5xl md:text-7xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text animate-pulse`}
      >
        PinDrop
      </div>

      <div className="bg-white/5 backdrop-blur-lg px-8 py-10 rounded-2xl shadow-md border border-white/10 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center">Log In</h2>

        <div className="space-y-3">
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            <FaGithub className="text-xl" />
            Sign in with GitHub
          </button>
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:opacity-90 py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>
        </div>

        <div className="border-t border-white/10 my-6"></div>

        <form onSubmit={handleManualLogin} className="space-y-4">
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl border border-white/10 focus-within:ring-2 ring-blue-400 transition">
            <MdOutlineAttachEmail className="text-blue-400 text-xl" />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none w-full text-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl border border-white/10 focus-within:ring-2 ring-purple-400 transition">
            <CiLock className="text-purple-400 text-xl" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full text-white placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 py-3 rounded-xl font-semibold hover:opacity-90 transition flex justify-center items-center cursor-pointer`}
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Log In"}
          </button>
        </form>

        <p className="text-center text-lg font-semibold text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href={"/signup"}
            className="text-blue-400 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { michroma } from "../layout";
import { CiLock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";


const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("password", user.password);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await axios.post(
        `/api/signup`,
        formData
      );

      console.log("Signup Success:", response.data);
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="text-white flex items-center justify-center gap-40 mt-36 px-4">
      {/* Logo */}
      <div
        className={`${michroma.className} text-5xl md:text-7xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text animate-pulse`}
      >
        PinDrop
      </div>

      {/* SignUp Form */}
      <div className="bg-white/5 backdrop-blur-lg px-8 py-10 rounded-2xl shadow-md border border-white/10 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          encType="multipart/form-data"
        >
          {/* Username */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl border border-white/10 focus-within:ring-2 ring-cyan-400 transition">
            <FaRegUser className="text-cyan-400 text-xl" />
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter Your Username"
              className="bg-transparent outline-none w-full text-white placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl border border-white/10 focus-within:ring-2 ring-blue-400 transition">
            <MdOutlineAttachEmail className="text-blue-400 text-xl" />
            <input
              type="email"
              placeholder="Enter Your Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="bg-transparent outline-none w-full text-white placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl border border-white/10 focus-within:ring-2 ring-purple-400 transition">
            <CiLock className="text-purple-400 text-xl" />
            <input
              type="password"
              placeholder="***********"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="bg-transparent outline-none w-full text-white placeholder:text-gray-400"
            />
          </div>

          {/* Avatar File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setAvatar(e.target.files[0]);
              }
            }}
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-500 file:to-purple-600 file:text-white hover:file:opacity-90 cursor-pointer"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-md flex items-center justify-center cursor-pointer`}
            disabled={loading}
          >
            {loading ? (
              <ImSpinner2 className="animate-spin text-xl" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p className="text-lg font-semibold">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-blue-400 hover:underline hover:text-blue-500 transition duration-200 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";

const Page = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/profile`
      );

      if (response.data.success) {
        setData(response.data.user);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen text-white relative">
      <Navbar />

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <ImSpinner2 className="text-6xl text-purple-400 animate-spin" />
        </div>
      )}

      <div className="flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl bg-transparent border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
          <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-8">
            User Profile
          </h1>

          {data && (
            <div className="space-y-6 text-center">
              <img
                src={data.avatar}
                alt="Avatar"
                className="w-40 h-40 mx-auto rounded-full shadow-lg border border-white/20"
              />
              <div className="space-y-2">
                <p className="text-2xl font-semibold">
                  Username: <span className="text-purple-300">{data.username || "N/A"}</span>
                </p>
                <p className="text-xl text-gray-300">
                  Email: <span className="text-cyan-300">{data.email}</span>
                </p>
                <p className="text-lg font-semibold text-gray-400">
                  Provider:{" "}
                  <span className="capitalize text-blue-400">
                    {data.providers}
                  </span>
                </p>
                
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;

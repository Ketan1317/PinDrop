"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "./Components/Card";
import { ImSpinner2 } from "react-icons/im";
import { IoClose } from "react-icons/io5";

const Page = () => {
  const [url, setUrl] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [search, setSearch] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [linkData, setLinkData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const cleanTag = tagInput.trim();
      if (!cleanTag.startsWith("#")) return;
      if (!tags.includes(cleanTag)) {
        setTags([...tags, cleanTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const generateSlug = (input: string): string => {
    return input
      .toLowerCase()
      .trim()
      .replace(/https?:\/\//, "")
      .replace(/www\./, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };
  const fetchLinks = async () => {
    try {
      setFetching(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/link`
      );
      setFetching(false);
      if (response.data.success) {
        setLinkData(response.data.allLinks);
        setFilteredData(response.data.allLinks);
      } else {
        toast.error(response.data.message || "Failed to load links");
      }
    } catch (error: any) {
      setFetching(false);
      toast.error("Failed to fetch links");
    }
  };
  useEffect(() => {
    fetchLinks();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || tags.length === 0) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/link`,
        {
          url: url,
          slug: slug,
          hashtags: tags,
          title:title
        }
      );
      setLoading(false);

      if (response.data.success) {
        toast.success(response.data.message || "Link added");
        setUrl("");
        setTitle("");
        setTags([]);
        fetchLinks();
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Server error");
    }
  };

  useEffect(() => {
    setSlug(generateSlug(url));
  }, [url]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredData(linkData);
      return;
    }
    const term = search.toLowerCase();
    const filtered = linkData.filter(
      (link) =>
        link.title?.toLowerCase().includes(term) ||
        link.hashtags?.some((tag: string) => tag.toLowerCase().includes(term))
    );
    setFilteredData(filtered);
  }, [search, linkData]);

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      <div className="flex justify-center mt-16 px-4">
        <div className="relative w-full max-w-2xl">
          <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tags or URL"
            className="w-full bg-transparent border-2 border-white/10 pl-12 pr-4 py-3 rounded-xl text-white placeholder:text-gray-400 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      <div className="flex items-center justify-center py-20 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-transparent border border-white/10 px-10 py-12 rounded-3xl shadow-2xl backdrop-blur-lg space-y-10"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Share Your Favorite Links
            </h2>
            <p className="text-white/50 text-lg">
              Add useful links with hashtags to organize and share them
              beautifully.
            </p>
          </div>

          {/* 🌐 URL Input */}
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-xl font-semibold">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="bg-transparent border placeholder:text-xl border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 🏷️ Optional Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-xl font-semibold">
              Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a custom title"
              className="bg-transparent border placeholder:text-xl border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          {/* 🏷️ Tags Input */}
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-xl font-semibold">Tags</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="#react, #coding..."
              className="bg-transparent border placeholder:text-xl border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-500/30 text-sm px-4 py-2 rounded-2xl border font-semibold border-purple-400 text-purple-100 flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-purple-300 hover:text-white"
                  >
                    <IoClose className="text-lg" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 🚀 Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className={`w-full ${
              loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            } bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition flex items-center justify-center`}
          >
            {loading ? (
              <ImSpinner2 className="animate-spin text-xl" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>

      {/* 🧾 Cards Display */}
      <div className="px-6 pb-20">
        <h3 className="text-2xl font-bold mb-6">🔗 Your Links</h3>

        {fetching ? (
          <ImSpinner2 className="animate-spin  text-xl text-blue-500 mx-auto mt-10" />
        ) : filteredData.length === 0 ? (
          <div className="text-center text-white/60 text-lg mt-10">
            No matching links found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
              <Card linkKaData={item} fetchLinks={fetchLinks} key={index} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Page;

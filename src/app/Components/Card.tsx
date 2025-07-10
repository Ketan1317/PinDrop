"use client";

import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaLink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Card = ({ linkKaData, fetchLinks }) => {
  const {
    url,
    title,
    description,
    hashtags = [],
    clickCount,
    favicon,
    image,
    slug,
  } = linkKaData || {};

  const handleClicks = async (url: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clicks`,
        { url }
      );
      fetchLinks();
    } catch (error: any) {
      toast.error("Failed to fetch links");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete`,
        { slug }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchLinks();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error("Failed to delete link");
    }
  };

  return (
    <div className="bg-transparent relative border border-white/10 backdrop-blur-md rounded-xl shadow-md overflow-hidden w-full max-w-md transition duration-300 hover:scale-[1.025] hover:shadow-lg">
      {/* Delete Button */}
      <button onClick={handleDelete} className="absolute cursor-pointer top-2 right-2 z-10">
        <IoClose className="text-2xl text-white hover:text-red-400 transition" />
      </button>

      {/* Thumbnail */}
      {image && (
        <div className="w-full h-48 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 text-white space-y-4">
        {/* Favicon + Title */}
        <div className="flex items-center gap-3">
          {favicon && (
            <img
              src={favicon}
              alt="favicon"
              width={20}
              height={20}
              className="rounded-sm"
            />
          )}
          <h2 className="font-semibold text-lg line-clamp-1" title={title}>
            {title}
          </h2>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-300 font-medium line-clamp-2">
            {description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-500/10 border border-purple-500 text-purple-200 text-s px-4 py-1 rounded-xl flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                className="hover:text-white focus:outline-none"
                onClick={() => toast("Remove tag functionality not yet implemented")}
              >
                <IoClose className="text-xs" />
              </button>
            </span>
          ))}
        </div>

        {/* Visit + Clicks */}
        <div className="flex items-center justify-between pt-4 text-sm">
          <a
            href={url}
            onClick={() => handleClicks(url)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline flex items-center gap-2 font-semibold"
          >
            <FaLink className="text-base" /> <span className="text-lg">Visit</span>
          </a>
          <p className="text-gray-400 text-lg font-medium">Clicks: {clickCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

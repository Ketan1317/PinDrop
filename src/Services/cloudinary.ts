import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "duv3sdlxg",
  api_key: "195653289813462",
  api_secret: "lfuCaFNQmooEb1YPp26sX87eIn0"
});

const uploadOnCloudinary = async (localFilePath: string): Promise<string> => {
  if (!localFilePath || typeof localFilePath !== "string") {
    throw new Error("Invalid file path provided for upload");
  }

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // Safe file cleanup
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response.secure_url; // More secure than .url
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

export default uploadOnCloudinary;

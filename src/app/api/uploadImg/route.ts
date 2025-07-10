import { writeFile } from "fs/promises";
import path from "path";
import { tmpdir } from "os";
import { v4 as uuid } from "uuid";
import uploadOnCloudinary from "@/Services/cloudinary"; // Existing Cloudinary function

// Utility function to upload a file to Cloudinary
export async function uploadFileToCloudinary(file: File): Promise<string> {
  try {
    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a temporary file path
    const tempFilePath = path.join(tmpdir(), `${uuid()}-${file.name}`);

    // Write the file to the temporary location
    await writeFile(tempFilePath, buffer);

    // Upload to Cloudinary and get the URL
    const uploadResult = await uploadOnCloudinary(tempFilePath);
    if (!uploadResult || !uploadResult.url) {
      throw new Error("Cloudinary upload failed");
    }

    return uploadResult.url;
  } catch (error) {
    console.error("Upload to Cloudinary error:", error);
    throw error; // Re-throw to be handled by the caller
  }
}
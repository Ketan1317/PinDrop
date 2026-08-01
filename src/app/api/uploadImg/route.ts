import { writeFile } from "fs/promises";
import path from "path";
import { tmpdir } from "os";
import { v4 as uuid } from "uuid";
import uploadOnCloudinary from "@/Services/cloudinary";

export async function uploadFileToCloudinary(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const tempFilePath = path.join(tmpdir(), `${uuid()}-${file.name}`);

  await writeFile(tempFilePath, buffer);

  const imageUrl = await uploadOnCloudinary(tempFilePath);

  if (!imageUrl) {
    throw new Error("Cloudinary upload failed");
  }

  return imageUrl;
}

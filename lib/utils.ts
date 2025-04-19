import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadToCloudinary(file: File) {
  const signatureRes = await fetch("/api/upload-signature");
  const { signature, timestamp, apiKey, cloudName } = await signatureRes.json();

  console.log("This is the cloudname: ", cloudName);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("folder", "profilePictures");
  formData.append("signature", signature);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  const uploadData = await uploadRes.json();
  console.log(uploadData.secure_url);
  return uploadData.secure_url;
}

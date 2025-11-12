import cloud from "../config/cloudinary.js";

export const uploadToCloudinary = async (file: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloud.uploader.upload_stream(
      { folder: "services" },
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    uploadStream.end(file.buffer);
  });
};

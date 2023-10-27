import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dcd3647d7",
  api_key: "959852791472886",
  api_secret: "FahwPL0XWVcXvzVIu2EmsWRm-bk",
});

const cdUpload = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (error, result) => {
      if (error) {
        console.error("Error uploading image to Cloudinary:", error);
        reject(error);
      } else {
        console.log(result.secure_url);
        const link = result.secure_url;
        resolve(link);
      }
    });
  });
};

export default cdUpload;

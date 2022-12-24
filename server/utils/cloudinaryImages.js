const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.cloudUpload = async (file, folder) => {
  const upload = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "auto",
  });
  return upload;
};

exports.cloudDeleteImage = async (public_id) => {
  const result = await cloudinary.uploader.destroy(public_id);

  return result;
};

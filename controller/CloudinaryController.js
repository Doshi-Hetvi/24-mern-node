const cloudinary = require("cloudinary").v2;

const uploadImage = async (file) => {
  
  cloudinary.config({
    cloud_name: "db2t93jvh",
    api_key: "727348378157376",
    api_secret: "bML-9JK78HfrcHRApYgfzrBPZKs",
  });
  
  const result = await cloudinary.uploader.upload(file)
  return result;
  
};
module.exports = {
    uploadImage,
}
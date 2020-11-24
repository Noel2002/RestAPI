const cloudinary= require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'nowo-ltd', 
    api_key: '614692313642849', 
    api_secret: 'jOa7nkUWs628VD_kQFNEqfCUetg' 
});

const uploadToCloud = async (file, res) => {
    try {
      const image = await cloudinary.uploader.upload(file.path, {
        folder: "MY-BRAND",
        use_filename: true,
      });
      return image;
    } catch (error) {
      return Response.error(res, 500, error);
    }
  };

  module.exports= uploadToCloud;
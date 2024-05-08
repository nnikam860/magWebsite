import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: 943829419471826, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    console.log(localFilePath + " at line 12 cloudinary");
    
    try {
        console.log(localFilePath + " at line 16 cloudinary");
        
        if (!localFilePath) return null 
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)

        return response;

    } catch (error) {
        console.log('error while uploading:', error.message);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Magazine } from "..//models/magazine.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

//post request 

const uploadMagazine = asyncHandler(async (req, res) => {
  
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { title, author, industry } = req.body;
  if (
    [title, author, industry].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedMagazine = await Magazine.findOne({
    $or: [{ title }],
  });

  if (existedMagazine) {
    throw new ApiError(409, "Article with this title already exists");
  }

  //for uploading PDF

  const PDFlocalFilePath = req.files?.magazinePDF[0]?.path;
  
  if (!PDFlocalFilePath) {
      throw new ApiError(400, "Magazine PDF file is required")
  }

  //for uploading cover image

  const coverImagelocalFilePath = req.files?.coverImage[0]?.path;
  
  if (!coverImagelocalFilePath) {
      throw new ApiError(400, "Cover image is required")
  }

  //uploading using cloudinary

  const magazinePDF = await uploadOnCloudinary(PDFlocalFilePath)
  const coverImage = await uploadOnCloudinary(coverImagelocalFilePath)

  if (!magazinePDF) {
    throw new ApiError(400, "PDF file is required")
}

if (!coverImage) {
    throw new ApiError(400, "Cover Image is required")
}

  const magazine = await Magazine.create({
    title,
    author,
    industry,
    magazinePDF:magazinePDF.url,
    coverImage:coverImage.url,
   
  });

  const createdMagazine = await Magazine.findById(magazine._id)

  if (!createdMagazine) {
    throw new ApiError(500, "Something went wrong while uploading the magazine");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdMagazine, "Magazine uploaded Successfully"));
});



//get request 

const getAllMagazine = asyncHandler(async (req,res)=>{

  const allMagazine = await Magazine.find({})
   res.status(200).json({allMagazine})

})

const toDeleteMagazine = asyncHandler(async(req, res)=>{
  const id = (req.params.magazineID)
  console.log(typeof(id));
  
  const data = await Magazine.deleteOne({_id: id}).then((result)=>{
    console.log(result);
   // res.status(204).json(204, "Article Deleted successfully")
    res.send(result)
    
  })

})

export { uploadMagazine };
export {getAllMagazine};
export {toDeleteMagazine}
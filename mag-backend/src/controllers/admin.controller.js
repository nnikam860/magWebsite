import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Admin } from "../models/admin.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerAdmin = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { username, email, fullName, password } = req.body;
  console.log("email: ", email);

  if (
    [ username, email, fullName,  password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await Admin.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // if (!avatarLocalPath) {
  //     throw new ApiError(400, "Avatar file is required")
  // }

  // const avatar = await uploadOnCloudinary(avatarLocalPath)
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  // if (!avatar) {
  //     throw new ApiError(400, "Avatar file is required")

  // }

  const admin = await Admin.create({
    username,
    email,
    fullName,
    password
    //avatar: avatar.url,
    //coverImage: coverImage?.url || "",
   
  });

  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdAdmin, "Admin registered Successfully"));
});



const loginUser = asyncHandler(async (req, res) =>{
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  
  const {email, password} = req.body
  console.log(req.body);
  
  console.log(typeof(email));
  

  //Here is an alternative of above code based on logic discussed in video:
  if (!(email)) {
      throw new ApiError(400, "email is required")
  }

  const user = await Admin.findOne({
      $or: [ {email}]
  })

  if (!user) {
      throw new ApiError(404, "User does not exist")
  }

 const isPasswordValid = await user.isPasswordCorrect(password)

 if (!isPasswordValid) {
  throw new ApiError(401, "Invalid user credentials")
  }

 //const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

 // const loggedInUser = await Admin.findById(user._id).select("-password");

  // const options = {
  //     httpOnly: true,
  //     secure: true
  // }

  return res.status(200)
.json(
      new ApiResponse(
          200, 
          {
             // user: loggedInUser
          },
          "User logged In Successfully"
      )
  )

})


export { registerAdmin, loginUser };

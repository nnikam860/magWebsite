import { Router } from "express";
import { registerAdmin } from "../controllers/admin.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(
//   upload.fields([
//     {
//       name: "avatar",  //code to upload file to cloudinary using middleware
//       maxCount: 1,
//     },
//     {
//       name: "coverImage",
//       maxCount: 1,
//     },
//   ]),

  registerAdmin
);

export default router;

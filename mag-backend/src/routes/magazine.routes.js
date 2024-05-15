import { Router } from "express";
import { uploadMagazine, getAllMagazine, toDeleteMagazine } from "../controllers/magazine.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/uploadMag").post(
  upload.fields([
    {
      name: "magazinePDF",  //code to upload file to cloudinary using middleware
      maxCount: 1,
    },
    {
        name: "coverImage",  //code to upload file to cloudinary using middleware
        maxCount: 1,
    }
  ]),

  uploadMagazine
);

router.route("").get(getAllMagazine)
router.route("/:magazineID").delete(toDeleteMagazine)

export default router;

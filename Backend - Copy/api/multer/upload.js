import multer from "multer";
import fs from "fs";

const uploadDir = "./public/images";

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log("multer to chl rha hai")
    let fileExtension = "";
    if (file.originalname.includes(".")) {
      fileExtension = file.originalname.substring(file.originalname.lastIndexOf("."));
    }
    const filenameWithoutExtension = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .split(".")[0];

    cb(
      null,
      `${filenameWithoutExtension}-${Date.now()}-${Math.ceil(Math.random() * 1e5)}${fileExtension}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/svg+xml" ]; 
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, .webp , .svg and .jpeg files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 20 * 1000 * 1000 }, // 20MB limit
  fileFilter,
});

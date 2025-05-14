import fs from "fs";
import path from "path";
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable automatic body parsing (needed for FormData)
  },
};

// Handle POST requests
export const post = (req: any, res: any) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads"); // Save in `public/uploads`
  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed" });
    }

    if (!files.file || files.file.length === 0) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = files.file[0]; // Get uploaded file
    if (!file.originalFilename) {
      return res.status(400).json({ message: "Original filename is missing" });
    }
    const filePath = path.join(uploadDir, file.originalFilename); // Use the uploadDir variable

    // Move the file to the uploads folder
    fs.renameSync(file.filepath, filePath);

    return res.status(200).json({ message: "File uploaded successfully", filePath });
  });
};

// You can add other HTTP methods here as needed

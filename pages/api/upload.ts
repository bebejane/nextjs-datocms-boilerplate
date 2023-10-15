// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';
import { PageConfig } from 'next';

export const config: PageConfig = {
  api: {
    bodyParser: false, // Disable built-in body parsing
  },
};

export default async function handler(req, res) {
  const form = formidable({ keepExtensions: true, uploadDir: '/tmp' });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'File upload failed.', message: err });
    } else {

      const file = files.file[0];
      const oldPath = file.filepath;
      const newPath = `/tmp/${file.originalFilename}`;
      const tmpDirFiles = fs.readdirSync('/tmp');
      fs.rename(oldPath, newPath, (renameErr) => {
        if (renameErr) {
          res.status(500).json({ error: 'File rename failed.' });
        } else {
          res.status(200).json({ message: 'File uploaded successfully.', tmpDirFiles });
        }
      });
    }
  });
};

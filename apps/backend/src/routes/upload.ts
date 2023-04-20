import crypto from 'crypto';
import express from 'express';
import multer from 'multer';
import { ApiError } from '../utils/apiError';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, Date.now() + '-' + crypto.randomUUID() + '.' + ext);
  },
});

const upload = multer({ storage: storage });

function handleErrors(req: express.Request, res: express.Response) {
  if (!req.body) {
    return res.json(
      ApiError.badRequest(
        'No body was provided',
        'Client did not provide a body in the request.',
        'Re-send the request with a body in the request. The body should be in the form of an object with the key "images" and the value being the file.'
      )
    );
  }

  if (!req.files || req.files.length === 0) {
    return res.json(
      ApiError.badRequest(
        'No files were provided',
        'Client did not provide any files in the request body.',
        'Re-send the request with files in the request body. The files should be in the form of an array of objects with the key "images" and the value being the file.'
      )
    );
  }

  const files = req.files as Express.Multer.File[];

  if (files.length > 10) {
    return res.json(
      ApiError.badRequest(
        'Too many files',
        'Client provided more than 10 files in the request body.',
        'Re-send the request with less than 10 files in the request body.'
      )
    );
  }

  if (files.filter((file) => !file.mimetype.includes('image/')).length > 0) {
    return res.json(
      ApiError.badRequest(
        'Invalid file type',
        'Client provided files that were not images.',
        'Re-send the request. While sending the request, make sure that the all files are images.'
      )
    );
  }

  if (files.filter((file) => file.size > 100000000).length > 0) {
    return res.json(
      ApiError.badRequest(
        'File too large',
        'Client provided files that were larger than 100MB.',
        'Re-send the request. While sending the request, make sure that the files are not larger than 100MB.'
      )
    );
  }

  return false;
}

/**
 * @route POST /upload
 * @desc Upload images
 * @todo: Add authentication and store filenames in database.
 */
router.post('/', upload.array('images', 10), (req, res) => {
  const errors = handleErrors(req, res);
  if (errors) return errors;

  const files = req.files as Express.Multer.File[];

  res.json({
    data: {
      message: 'Files uploaded successfully',
      files: files.map((file) => ({
        originalName: file.originalname,
        storedName: file.filename,
        url: `http://localhost:3000/uploads/${file.filename}`,
      })),
    },
  });
});

export default router;

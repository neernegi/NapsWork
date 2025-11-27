import express from 'express';
import { createPost, fetchPosts } from '../controllers/post.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { postCreateValidator, fetchPostsValidator } from '../middleware/validators.js';

const router = express.Router();

router.post('/',postCreateValidator, protect, createPost);

router.get('/', fetchPostsValidator, fetchPosts);

export default router;

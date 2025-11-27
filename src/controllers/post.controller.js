import Post from "../models/post.model.js";
import mongoose from "mongoose";

export const createPost = async (req, res, next) => {
  try {
    const { postName, description, tags, imageUrl } = req.body;

    const userId = req.user.id;

    const post = new Post({
      userId: new mongoose.Types.ObjectId(userId),
      postName,
      description,
      tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
      imageUrl,
    });

    await post.save();

    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
};

export const fetchPosts = async (req, res, next) => {
  try {
    const { searchText, startDate, endDate, tags } = req.query;
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);
    const skip = (page - 1) * limit;

    const filter = {};

    if (searchText) {
      const regex = new RegExp(searchText, "i");
      filter.$or = [{ postName: regex }, { description: regex }];
    }

    if (startDate || endDate) {
      filter.uploadTime = {};
      if (startDate) filter.uploadTime.$gte = new Date(startDate);
      if (endDate) filter.uploadTime.$lte = new Date(endDate);
    }

    if (tags) {
      // tags could be comma separated
      const tagsArray = Array.isArray(tags)
        ? tags
        : String(tags)
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
      if (tagsArray.length) filter.tags = { $in: tagsArray };
    }

    const [total, posts] = await Promise.all([
      Post.countDocuments(filter),
      Post.find(filter).sort({ uploadTime: -1 }).skip(skip).limit(limit).lean(),
    ]);

    res.json({
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      posts,
    });
  } catch (err) {
    next(err);
  }
};

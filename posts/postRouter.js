const express = require("express");
const Post = require("./postDb");
const { validatePostId, validatePost } = require("../middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.get();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to get posts" });
  }
});

router.get("/:id", validatePostId, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.getById(id);
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Failed to get post" });
  }
});

router.delete("/:id", validatePostId, async (req, res) => {
  try {
    const { id } = req.params;
    const count = await Post.remove(id);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
});

router.put("/:id", validatePostId, validatePost, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.update(id, req.body);
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Failed to update post" });
  }
});

module.exports = router;

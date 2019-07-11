const express = require("express");

const router = express.Router();
const User = require("./userDb");
const Post = require("../posts/postDb");
const { validateUserId, validateUser, validatePost } = require("../middleware");

router.post("/", validateUser, async (req, res) => {
  try {
    const { body } = req;
    const user = await User.insert(body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const post = await Post.insert({ ...body, user_id: id });
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.get();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Could not get users" });
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.getById(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Could not get user" });
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await User.getUserPosts(id);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Unable to get user posts" });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const count = await User.remove(id);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Could not delete user" });
  }
});

router.put("/:id", validateUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await User.update(id, body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

module.exports = router;

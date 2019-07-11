const express = require("express");
const { logger } = require("./middleware");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at localhost:${port}`));

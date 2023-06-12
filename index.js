const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/users.route");
const { LogoutModel } = require("./model/logout.model");

const {postsRouter}=require("./routes/post.routes")

const app = express();

app.use(express.json());

app.get("/logout", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    let blocku = new LogoutModel({ token });

    await blocku.save();

    res.status(200).json({ msg: "logout successfull" });
  } catch (error) {
    res.status.json({ msg: error.message });
  }
});

app.use("/users", userRouter);

app.use("/posts",postsRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;

    console.log("server has connected to DB");
  } catch (error) {
    console.log(error.message);
  }
});

const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const postsRouter = require("./routers/posts.js");

const errorHandler = require("./middlewares/errorHandler.js");
const notFound = require("./middlewares/notFound.js");

app.get("/", (req, res) => {
    res.send("<h1>Server del mio blog</h1>")
});

app.use("/posts", postsRouter);

// app.all("*", (req, res) => {
//     res.status(404).send("<h1>Error 404 - Not found</h1>");
// });

app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
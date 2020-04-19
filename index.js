const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
// const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");
const welcomeRouter = require("./welcome/welcomeRouter");
const postRouter = require("./posts/postRouter");

const server = express();
const port = 4003;

server.use(express.json);
server.use(cors());
//server.use(morgan())

server.use("/users", userRouter);
server.use("/post", postRouter);

// this middle function will only run if not route is found
// routes never call `next()`, so if a route is found, this never runs

server.use((req, res) => {
    res.status(404).json ({
        message: "Route was not found",
    })
})

// any time a middleware functions calls `next` with a paramete, like `next(error)`,
// this middleware function will run. The stack skips directly down to it, like a catch statement

server.use((err, req, res, next) => {

    console.log(err);

    res.status(500).json({

        // we saying the general "something went wrong" because we don't want to display internals of
        // our stack to end users because it makes our applications/APIs more vulernable

        message: "Something went wrong", 
    })

})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
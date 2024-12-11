const express = require("express");

const path = require("path");

const staticRoute = require("./routes/staticRouter");

const { connect } = require("./connection");

const URL = require("./models/url");

const urlRoute = require("./routes/url");

const cookieParser = require("cookie-parser");

const { restrictToLoggedInUser , checkAuth } = require("./middlewares/auth");

const app = express();

const userRoute = require("./routes/user");

app.set("view engine", "ejs");

app.set("views", path.resolve("./views"))


app.use(express.json());
app.use(express.urlencoded( { extended: false }));

app.use(cookieParser());

connect("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("Database connected"));

// app.get("/test", async (req, res) => {
//     const allurl = await URL.find({ });
//     return res.render("home", {
//         urls: allurl,
//     });
// });

app.use("/url", restrictToLoggedInUser, urlRoute);

app.use("/user", userRoute);

app.use("/", checkAuth, staticRoute);


app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push:
        {
            visitHistory:
            {
                timestamp : Date.now(),
            },
        },
    });
    res.redirect(entry.redirectURL);
});

const PORT = 8000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
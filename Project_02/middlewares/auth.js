const { getUser } = require("../service/auth");

async function restrictToLoggedInUser(req, res, next) {
    // const userUid  = req.cookies?.uid;
    // since cookies are no longer in picture
    const userUid = req.headers["Authorization"];
    if(!userUid) {
        return res.redirect("/login");
    }
    const token = userUid.split(" ")[1];
    // const user = getUser(userUid);
    const user = getUser(token);
    // validate the user
    if(!user) {
        return res.redirect("/login");
    }
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    // const userUid  = req.cookies?.uid;

    const userUid = req.headers["authorization"];

    const token = userUid.split(" ")[1];

    const user = getUser(token);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUser,
    checkAuth,
};
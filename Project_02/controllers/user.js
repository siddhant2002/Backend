const User = require("../models/user");

const { setUser } = require("../service/auth");

const { v4: uuidv4 } = require("uuid");

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogIn(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password});
    if(!user)
    {
        return res.render("login", {
            error: "Invalid email or password"
        });
    }
    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie("uid", sessionId);
    const token  = setUser(user);
    // res.cookie("uid", token);
    // for sending token through response
    // return res.redirect("/");
    return res.json({ token});
}


module.exports = {
    handleUserSignUp,
    handleUserLogIn,
};
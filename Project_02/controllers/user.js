const User = require("../models/user");

async function handleUserSignUp(req, res) {
    const { name, password, email } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogIn(req, res) {
    const { password, email } = req.body;
    const user = await User.findOne({ email, password});
    if(!user)
    {
        return res.render("login", {
            error: "Invalid email or password"
        });
    }
    return res.redirect("/");
}


module.exports = {
    handleUserSignUp,
    handleUserLogIn,
};
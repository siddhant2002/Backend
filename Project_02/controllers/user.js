const User = require("../models/user");

async function handleUserSignUp(req, res) {
    const { name, password, email } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.render("home");
}

module.exports = {
    handleUserSignUp,
};
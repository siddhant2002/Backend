const User  = require("../models/user");

async function handleGetAllUsers(req, res) {
    const users = await User.find({});
    res.json(users);
};

async function handleGetUsersById(req,res) {
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return res.status(404).json({status : "Bad Request"});
    }
    res.json(user);
}


async function handlePatchRequestById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Wyatt"});
    return res.json({status: "Success"});
}


async function handleDeleteRequestById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Success"});
}

async function handleCreateNewuser(req, res) {
    const body = req.body;
    if(!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.job_title ||
        !body.gender)
    {
        return res.status(400).json({status : "BAD REQUEST"});
    }
    console.log("Body", body);
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        gender: body.gender,
        email: body.email,
        jobTitle: body.job_title,
    });
    console.log(result);
    return res.status(201).json({Status: "User details added", id: body.id});
}

module.exports = {handleGetAllUsers, 
    handleGetUsersById,
    handlePatchRequestById,
    handleDeleteRequestById,
    handleCreateNewuser,
};
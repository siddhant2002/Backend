const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();

// Route

mongoose.connect("mongodb://127.0.0.1:27017/siddhant")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Error ", err));

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
}, {timestamps: true} );

const User = mongoose.model("user", userSchema);

app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({});
    const html = 
    `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")};
    </ul>
    `
    res.status(200).send(html);
});

app.get("/api/users", async (req, res) => {
    // console.log(req.headers);
    // res.setHeader("X-Myname", "Piyush Garg");
    const users = await User.find({});
    res.json(users);
});

// app.get("/api/users/:id", (req,res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id)
//     res.json(user);
// });

// app.patch("/api/users/:id", (req, res) => {
//     return res.json({status: "Pending"});
// })

// app.delete("/api/users/:id", (req, res) => {
//     return res.json({status: "Pending"});
// })


app.use(express.urlencoded({ extended : false}));

app.route("/api/users/:id")
.get(async (req,res) => {
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return res.status(404).json({status : "Bad Request"});
    }
    res.json(user);
})
.patch( async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Wyatt"});
    return res.json({status: "Success"});
})
.delete( async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Success"});
});

app.post("/api/users", async(req, res) => {
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
    return res.status(201).json({Status: "User details added"});
});

const port = 8000;

app.listen(port, () => console.log("Listening at 8000"));
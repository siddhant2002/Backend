const express = require("express");
const users = require("./document.json");
const fs = require("fs");

const app = express();

// Route

app.get("/users", (req, res) => {
    const html = 
    `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")};
    </ul>
    `
    res.status(200).send(html);
});

app.get("/api/users", (req, res) => {
    console.log(req.headers);
    res.setHeader("X-Myname", "Piyush Garg");
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
.get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id)
    res.json(user);
})
.patch((req, res) => {
    return res.json({status: "Pending"});
})
.delete((req, res) => {
    return res.json({status: "Pending"});
});

app.post("/api/users", (req, res) => {
    const body = req.body;
    // if(! body || ! body.first_name || ! body.last_name || ! body.email || ! body.job_title || ! body.gender)
    // {
    //     return res.status(400).json({status : "BAD REQUEST"});
    // }
    console.log("Body", body);
    users.push({...body, id: users.length+1});
    fs.writeFile("./document.json", JSON.stringify(users), (err, data) => {
        return res.status(201).json({status: "success", id: users.id});
    });
});

const port = 8000;

app.listen(port, () => console.log("Listening at 8000"));
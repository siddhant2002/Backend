const express = require("express");
const users = require("./document.json");

const app = express();

// Route

app.get("/users", (req, res) => {
    const html = 
    `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")};
    </ul>
    `
    res.send(html);
});

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get("/api/users/:id", (req,res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id)
    res.json(user);
});

app.patch("/api/users/:id", (req, res) => {
    return res.json({status: "Pending"});
})

app.delete("/api/users/:id", (req, res) => {
    return res.json({status: "Pending"});
})

const port = 8000;

app.listen(port, () => console.log("Listening at 8000"));
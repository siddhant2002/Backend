const express = require("express");

const { handleGetAllUsers, handleGetUsersById, handlePatchRequestById, handleDeleteRequestById, handleCreateNewuser } = require("../controllers/user");

const router = express.Router;

// app.get("/users", async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = 
//     `
//     <ul>
//         ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")};
//     </ul>
//     `
//     res.status(200).send(html);
// });

// router.get("/", handleGetAllUsers);

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewuser);


router.route("/:id")
.get(handleGetUsersById)
.patch(handlePatchRequestById)
.delete(handleDeleteRequestById);

// router.post("/", handleCreateNewuser);

module.exports = router;
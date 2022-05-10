const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    User.findOne({
        attributes: { exclude: ["password"] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ["id", "title", "post_url", "created_at"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "created_at"],
                include: {
                    model: Post,
                    attributes: ["title"]
                }
            },
            // {
            //     model: Post,
            //     attributes: ["title"],
            // }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ messgae: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// login route to verify the user's identity
router.post("/login", (req, res) => {
    // queried the user table for the user's email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        // if email not found, throw an error
        if (!dbUserData) {
            res.status(400).json({ message: "No user with that email address!" });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        // if password is incorrect, throw error
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect password" });
            return;
        }
        res.json({ user: dbUserData, message: "You are now logged in!" });
    });
});

router.put("/:id", (req, res) => {
    User.update(req.body, {
        // option to the query call for the beforeUpdate hook in User
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500) / json(err);
        });
});

module.exports = router;
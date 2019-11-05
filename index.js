// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.listen(4000, () => {
  console.log(
    `▄▄▄▄▄▄▄▄▄
    ░▄███████▀▀▀▀▀▀███████▄
    ░▐████▀▒DIDDLY▒▒▒▒▀██████▄
    ░███▀▒▒▒▒SERVER▒▒▒▒▒▀█████
    ░▐██▒▒▒▒▒▒DOODLY▒▒▒▒▒▒████▌
    ░▐█▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒████▌
    ░░█▒▄▀▀▀▀▀▄▒▒▄▀▀▀▀▀▄▒▐███▌
    ░░░▐░░░▄▄░░▌▐░░░▄▄░░▌▐███▌
    ░▄▀▌░░░▀▀░░▌▐░░░▀▀░░▌▒▀▒█▌
    ░▌▒▀▄░░░░▄▀▒▒▀▄░░░▄▀▒▒▄▀▒▌
    ░▀▄▐▒▀▀▀▀▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒█
    ░░░▀▌▒▄██▄▄▄▄████▄▒▒▒▒█▀
    ░░░░▄██████████████▒▒▐▌
    ░░░▀███▀▀████▀█████▀▒▌
    ░░░░░▌▒▒▒▄▒▒▒▄▒▒▒▒▒▒▐
    ░░░░░▌▒▒▒▒▀▀▀▒▒▒▒▒▒▒▐`
  );
});

server.use(express.json());

// server.get("/", (request, response) => {
//   response.send("hello world...");
// });

server.get("/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: "The users information could not be retrieved.",
        success: false
      });
    });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user !== undefined) {
        res.status(201).json({
          success: true,
          user
        });
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The user information could not be retrieved."
      });
    });
});

server.post("/users", (req, res) => {
  const userInfo = req.body;
  console.log("body: ", userInfo);

  db.insert(userInfo)
    .then(user => {
      if ("name" in userInfo && "bio" in userInfo) {
        res.status(201).json({
          success: true,
          user: userInfo
        });
      } else {
        res
          .status(400)
          .json({
            errorMessage: "Please provide name and bio for the user."
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              error: "There was an error while saving the user to the database"
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err,
        success: false
      });
    });
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ success: false, error: "The user could not be removed" });
    });
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const userInfo = req.body;

  db.update(id, userInfo)
    .then(user => {
      if (user) {
        if ("name" in userInfo && "bio" in userInfo) {
          res.status(200).json({ success: true, user: userInfo });
        } else {
          res.status(400).json({
            success: false,
            errorMessage: "Please provide name and bio for the user."
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          success: false,
          error: "The user information could not be modified."
        });
    });
});

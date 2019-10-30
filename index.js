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

server.get("/", (request, response) => {
  response.send("hello world...");
});

server.get("/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: err,
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
        res
          .status(404)
          .json({
            message: `I could not find the id=${id}`
          })
          .catch(err => {
            res.status(500).json({ success: false, err });
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

server.post("/users", (req, res) => {
  const userInfo = req.body;
  console.log("body: ", userInfo);

  db.insert(userInfo)
    .then(user => {
      res.status(201).json({
        success: true,
        user
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err,
        success: false
      });
    });
});

// server.delete("/hubs/:id", (req, res) => {
//   const { id } = req.params;

//   db.remove(id).then(deletedHub => {
//     if (deletedHub) {
//       res.status(204).end();
//     } else {
//       res
//         .status(404)
//         .json({
//           message: `I could not find the id=${id}`
//         })
//         .catch(err => {
//           res.status(500).json({ success: false, err });
//         });
//     }
//   });
// });

// server.put("/hubs/:id", (req, res) => {
//   const { id } = req.params;
//   const hubInfo = req.body;

//   db.update(id, hubInfo)
//     .then(hub => {
//       if (hub) {
//         res.status(200).json({ success: true, hub });
//       } else {
//         res
//           .status(404)
//           .json({ success: false, message: `id ${id} does not exist` });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ success: false, err });
//     });
// });

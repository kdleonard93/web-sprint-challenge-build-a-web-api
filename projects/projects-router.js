const express = require("express");
const projectData = require("../data/helpers/projectModel");
const router = express.Router();

//GET all projects
router.get("/", (req, res) => {
  projectData
    .get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Projects not found."
      });
    });
});

//GET projects by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  projectData
    .get()
    .then(userProject => {
      if (!id) {
        res.status(404).json({
          message: "Project wit specified ID does not exist."
        });
      } else {
        res.status(200).json(userProject);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Project creation failed."
      });
    });
});

//POST projects
router.post("/", (req, res, next) => {
  projectData
    .insert(req.body)
    .then(newProject => {
      if (req.body.name && req.body.description) {
        res.status(200).json(newProject);
      } else {
        res.status(400).json({
          message: "Please include sname and description."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Project creation failed."
      });
    });
});

//PUT(update) projects
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  projectData
    .update(id, changes)
    .then(project => {
      if (!id) {
        res.status(404).json({
          message: "Project wit specified ID does not exist."
        });
      } else if (!changes.name || !changes.description) {
        res.status(400).json({
          message: "Please include name and description."
        });
      } else {
        res.status(200).json(changes);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Project update failed."
      });
    });
});

//DELETE projects
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  projectData
    .remove(id)
    .then(trash => {
      if (!id) {
        res.status(404).json({
          message: "Project wit specified ID does not exist."
        });
      } else {
        res.status(200).json(trash);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Project could not be deleted. Try again."
      });
    });
});

module.exports = router;

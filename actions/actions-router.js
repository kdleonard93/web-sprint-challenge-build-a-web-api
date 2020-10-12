const express = require("express");
const actionData = require("../data/helpers/actionModel");
const router = express.Router();

//GET all actions
router.get("/", (req, res) => {
  actionData
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Actions not found."
      });
    });
});

//POST action
router.post("/", (req, res) => {
  if (req.body.notes && req.body.description) {
    actionData
    .insert(req.body)
    .then(newAction => {
      res.status(200).json(newAction);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Project creation failed."
      });
    });
  } else {
    res.status(400).json({
      message: "Please include notes and description."
    });
  }
});

//PUT (update) action
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const project_id = req.body.project_id;
  const description = req.body.description;
  const notes = req.body.notes;

  if (!id || !project_id || !description || !notes) {
    res.status(400).json({
      error: "Please include ID, project_id, description, and notes "
    });
  } else {
    actionData
      .update(id, req.body)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(404).json({
            message: "The action with this ID does not exist."
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Failed to update action. Try again.",
          err
        });
      });
  }
});

//DELETE action
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  actionData
    .remove(id)

    .then(deleted => {
      if (deleted)
        res.status(204).json({
          message: "Deleted action."
        });
      else {
        res.status(404).json({
          message: "Invalid action ID."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to delete action. Try again.",
        err
      });
    });
});

module.exports = router;


import express from "express";
import * as taskService from "../services/taskservice.js";

const router = express.Router();

router.post("/createtask", async (req, res) => {

    console.log("BODY:", req.body);
    console.log("TOKEN:", req.headers["token"]);

    const result =
        await taskService.createTask(
            req.body,
            req.headers["token"]
        );

    console.log("RESULT:", result);

    res.json(result);
});

router.get("/tasks", async (req, res) => {

    const result =
        await taskService.getTasks();

    res.json(result);
});

router.get("/tasks/user/:userId", async (req, res) => {

    const result =
        await taskService.getUserTasks(
            req.params.userId
        );

    res.json(result);
});

router.get("/tasks/:id", async (req, res) => {

    const result =
        await taskService.getTaskById(
            req.params.id
        );

    res.json(result);
});

router.put("/updatetask/:id", async (req, res) => {

    const result =
        await taskService.updateTask(
            req.params.id,
            req.body
        );

    res.json(result);
});

router.put("/updatestatus/:id", async (req, res) => {

    const result =
        await taskService.updateTaskStatus(
            req.params.id,
            req.body.status
        );

    res.json(result);
});

router.delete("/deletetask/:id", async (req, res) => {

    const result =
        await taskService.deleteTask(
            req.params.id
        );

    res.json(result);
});

export default router;

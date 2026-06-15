import Tasks from "../models/tasks.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY =
process.env.SECRET_KEY;

const toClientTask = (task) => {

  const obj =
    task.toObject
      ? task.toObject()
      : task;

  return {
    ...obj,
    id: obj._id.toString(),
    createdAt: obj.createdat,
    updatedAt: obj.updatedat
  };
};

const resolveCreatedBy = (
  data,
  token
) => {

  if (token) {

    try {

      const payload =
        jwt.verify(
          token,
          SECRET_KEY
        );

      const tokenUserId =
        payload.crid ||
        payload.id ||
        payload.userId;

      if (tokenUserId) {

        return Number(
          tokenUserId
        );
      }

    } catch (error) {

      if (!data.createdBy && !data.createdby) {
        throw error;
      }
    }
  }

  return Number(
    data.createdBy ||
    data.createdby
  );
};

export async function createTask(data, token) {

  try {

    const createdBy =
      resolveCreatedBy(
        data,
        token
      );

    if (!createdBy) {

      return {

        code: 400,

        message:
        "createdBy is required"
      };
    }

    const task =
      await Tasks.create({
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        status: data.status || "OPEN",
        createdBy,
        deadline: data.deadline || "",
        assignedTo: data.assignedTo || null
      });

    return {

      code: 200,

      message:
      "Task Created Successfully",

      issue:
      toClientTask(task),

      task:
      toClientTask(task)

    };

  }

  catch (error) {

    return {

      code: 500,

      message:
      error.message

    };

  }

}

export async function getTasks() {

  try {

    const tasks =
      await Tasks.find()
        .sort({ createdat: -1 });

    return {
      code: 200,
      issues: tasks.map(toClientTask),
      tasks: tasks.map(toClientTask)
    };

  } catch (error) {

    return {
      code: 500,
      message: error.message
    };
  }
}

export async function getUserTasks(userId) {

  try {

    const tasks =
      await Tasks.find({
        createdBy: Number(userId)
      }).sort({ createdat: -1 });

    return {
      code: 200,
      issues: tasks.map(toClientTask),
      tasks: tasks.map(toClientTask)
    };

  } catch (error) {

    return {
      code: 500,
      message: error.message
    };
  }
}

export async function getTaskById(id) {

  try {

    const task =
      await Tasks.findById(id);

    if (!task) {

      return {
        code: 404,
        message: "Task Not Found"
      };
    }

    return {
      code: 200,
      issue: toClientTask(task),
      task: toClientTask(task)
    };

  } catch (error) {

    return {
      code: 500,
      message: error.message
    };
  }
}

export async function updateTask(id, data) {

  try {

    const updates = {};

    [
      "title",
      "description",
      "category",
      "priority",
      "status",
      "deadline",
      "assignedTo",
      "updatedBy"
    ].forEach((field) => {

      if (data[field] !== undefined) {
        updates[field] = data[field];
      }
    });

    const task =
      await Tasks.findByIdAndUpdate(
        id,
        updates,
        {
          new: true,
          runValidators: true
        }
      );

    if (!task) {

      return {
        code: 404,
        message: "Task Not Found"
      };
    }

    return {
      code: 200,
      message: "Task Updated Successfully",
      issue: toClientTask(task),
      task: toClientTask(task)
    };

  } catch (error) {

    return {
      code: 500,
      message: error.message
    };
  }
}

export async function updateTaskStatus(id, status) {

  return updateTask(
    id,
    { status }
  );
}

export async function deleteTask(id) {

  try {

    const task =
      await Tasks.findByIdAndDelete(id);

    if (!task) {

      return {
        code: 404,
        message: "Task Not Found"
      };
    }

    return {
      code: 200,
      message: "Task Deleted Successfully"
    };

  } catch (error) {

    return {
      code: 500,
      message: error.message
    };
  }
}

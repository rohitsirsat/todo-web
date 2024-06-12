import { Router } from "express";

import {
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoDoneStatus,
  getAllTodos,
  getTodoById,
} from "../controllers/todo.controllers.js";

import {
  createTodoValidator,
  getAllTodosQueryValidators,
  updateTodoValidator,
} from "../validators/todo.Validators.js";

import { mongoIdPthVariableValidator } from "../common/mongodb.validators.js";

const router = Router();

router
  .route("/")
  .post(createTodoValidator(), createTodo)
  .get(getAllTodosQueryValidators(), getAllTodos);

router
  .route("/:todoId")
  .get(mongoIdPthVariableValidator("todoId"), getTodoById)
  .patch(
    mongoIdPthVariableValidator("todoId"),
    updateTodoValidator(),
    updateTodo
  )
  .delete(mongoIdPthVariableValidator("todoId"), deleteTodo);
router
  .route("/toggle/status/:todoId")
  .patch(mongoIdPthVariableValidator("todoId"), toggleTodoDoneStatus);

export default router;

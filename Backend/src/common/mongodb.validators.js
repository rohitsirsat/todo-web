import { param } from "express-validator";

/* 
A common validator responsible to validate mongodb ids passed in url's path variable
*/

export const mongoIdPthVariableValidator = (idName) => {
  return [
    param(idName).notEmpty().isMongoId().withMessage(`Invalid ${idName}`),
  ];
};

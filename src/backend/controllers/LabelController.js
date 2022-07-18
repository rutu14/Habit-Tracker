import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to Habit Label are present here.
 * These are Privately accessible routes.
 * */

/**
 * This handler handles getting user habit labels.
 * send GET Request at /api/labels
 * */

export const getLabelsHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  return new Response(200, {}, { labels: user.labels });
};

/**
 * This handler handles creating user project labels.
 * send POST Request at /api/labels/:labelName
 * */

export const createLabelHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { label } = JSON.parse(request.requestBody);
  const indexFound = user.labels.findIndex((labelPresent) => labelPresent.labelName === label.labelName );
  if (indexFound !== -1 ) {
    return new Response(
      409,
      {},
      { errors: ["Duplicate data found. Label name must be unique."] }
    );
  }
  const createdLabel = {
    _id: uuid(),
    ...label,
  };
  user.labels.push(createdLabel);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { labels: user.labels });
};

/**
 * This handler handles deleting user project labels.
 * send DELETE Request at /api/labels/:labelName
 * */

export const deleteLabelHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const labelId = request.params.labelId;
  user.labels = user.labels.filter((label) => label._id !== labelId);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { labels: user.labels });
};

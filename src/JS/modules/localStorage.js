import { arrayitems } from "../index.js";

export const updateLocal = () => {
  let tostring = JSON.stringify(arrayitems);
  localStorage.setItem("toDo", tostring);
};

import getMessage from "./script.js";
import { clearInput, eventKeyHandler } from "./functions.js";
const submitButton = document.querySelector("#submit");
const newChat = document.querySelector("#new-chat");
const input = document.querySelector("input");

submitButton.addEventListener("click", getMessage);
newChat.addEventListener("click", clearInput);
input.addEventListener("keyup", eventKeyHandler);

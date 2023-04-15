// imports
import { SVGS } from "./svg.js";
import { url, options } from "./config.js";
import {
  AddEventToEditBtn,
  AddEventToRemoveBtn,
  btnItemFunction,
  changeInput,
  clearInput,
  hamburgerEvent,
} from "./functions.js";
// select dom elements
const outPutElement = document.querySelector("#output");
const history = document.querySelector(".history");
const input = document.querySelector("input");
const container = document.querySelector('.container')
let HTML_CONETNET = "";

// main function
async function getMessage() {
  container.style.display='none'
  let question = input.value
  let body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: question }],
    max_tokens: 100,
  });
  const userQuestion = document.createElement("div");
  const userImg = document.createElement("img");
  userImg.setAttribute("id", "avatar");
  userImg.setAttribute("src", "./img/avatar.jpg");
  userImg.setAttribute("alt", "avatar");
  userQuestion.appendChild(userImg);
  userQuestion.classList.add("user-question");
  userQuestion.append(input.value);
  outPutElement.appendChild(userQuestion);
  HTML_CONETNET = outPutElement.getInnerHTML();
  try {
    const response = await fetch(url, { ...options, body });
    const data = await response.json();
    if (data.choices[0].message.content) {
      HTML_CONETNET =
        HTML_CONETNET +
        `<div class='boot-response'> ${SVGS.chatGpt}  ${data.choices[0].message.content}</div>`;
      outPutElement.innerHTML = HTML_CONETNET;
      const buttonEelment = document.createElement("button");
      buttonEelment.classList.add("btnElement");
      buttonEelment.innerHTML =
        SVGS.message +
        `<div class='question-container'>
        <span class='question'>${input.value.slice(0,10)+'.....'}</span></div>` +
        `
      <div class='interaction-btns'>
      ${SVGS.edit + SVGS.delete}
      </div>`;
      buttonEelment.addEventListener("click", (e) => {
        changeInput(question);
        console.log("clicked");
      });
      history.append(buttonEelment);
      // history events

      const btnsDelete = document.getElementsByClassName("delete-btn");
      const btnsEdit = document.getElementsByClassName("edit-btn");

      AddEventToRemoveBtn(btnsDelete, buttonEelment);
      AddEventToEditBtn(btnsEdit, buttonEelment);
      clearInput();
    }
  } catch (error) {
    console.error("something went wrong", error);
  }
}

hamburgerEvent()
btnItemFunction()

export default getMessage;

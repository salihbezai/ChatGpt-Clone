import getMessage from "./script.js";
import { SVGS } from "./svg.js";
const input = document.querySelector("input");
const body = document.querySelector('body')
const sidebar = document.querySelector('.sidebar')
const hamburger = document.querySelector('#hamburger')
const  btnItems = document.getElementsByClassName('btn-item-q')

// 
let inputOpen = false;
export const clearInput = function clearInput() {
  input.value = "";
};

export const changeInput = function changeInput(value) {
  input.value = value;
};

// event key handler
export const eventKeyHandler = function eventKeyHandler(e) {
  if (e.key === "Enter" && input.value.length > 0) {
    getMessage();
  }
};

export const AddEventToRemoveBtn = function AddEventToRemoveBtn(
  btns,
  buttonEelment
) {
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (event) {
      buttonEelment.remove();
      event.stopPropagation();
    });
  }
};
// edit btn
export const AddEventToEditBtn = function AddEventToEditBtn(
  btns,
  buttonEelment
) {
  console.log(inputOpen)
  const question = buttonEelment.querySelector(".question");
  const questionConatainer = buttonEelment.querySelector(".question-container");
  for (let i = 0; i < btns.length; i++) {

    btns[i].addEventListener("click", function (event) {
       
      const btnEdit = buttonEelment.querySelector(".edit-btn");
      const btnDelete = buttonEelment.querySelector(".delete-btn");
      btnEdit.style.display = 'none'
      btnDelete.style.display = 'none'
      console.log("edit clicked");
      const partent1 = event.currentTarget.parentElement;
      const buttonParent = partent1.parentElement;
      const input = document.createElement("input");
      input.classList.add("message-input");
      const Text = question.textContent;
      input.value = Text;
      question.style.display = 'none'
      if(!inputOpen){
        questionConatainer.appendChild(input);
        inputOpen = true
        changeBtnsStatus(buttonParent,btns[i]);
        const btnsConfirm = document.getElementsByClassName("correct-btn");
        AddEventToConfirmBtn(btnsConfirm, buttonEelment,question);

      }


      event.stopPropagation();
    });
  }
};

// confirm btn
export const AddEventToConfirmBtn = function AddEventToConfirmBtn(
  confirmBtns,
  btnElement,
  question
) {

  for (let i = 0; i < confirmBtns.length; i++) {
    const input = btnElement.querySelector(".message-input");
    confirmBtns[i].addEventListener("click", function (event) {

  
    inputOpen = false
      const text = input.value;
      question.textContent =  text
      question.style.display = 'block'
      input.remove();
      changeBtnsStatusToDefault(btnElement);
    });
  }
};
// change btn status
function changeBtnsStatus(parentButton,btnedit) {
  const btnDelete = parentButton.querySelector(".delete-btn");
  const btnEdit = parentButton.querySelector(".edit-btn");
  const btnsInteraction = parentButton.querySelector(".interaction-btns");
  const removeBtn = SVGS.remove;
  const correctBtn = SVGS.correct;
  btnDelete.remove();
  btnEdit.remove();
  const xmlString = `<div>${removeBtn + correctBtn}</div>`;
  // btnsInteraction.innerHTML = correctBtn + removeBtn;
  var doc = new DOMParser().parseFromString(xmlString, "text/xml");
  const firstCild = doc.childNodes[0].firstChild;
  const secondChild = doc.childNodes[0].lastChild;
  console.log(firstCild,secondChild)
  btnsInteraction.append(firstCild);
  btnsInteraction.append(secondChild);
}
// change btn status
function changeBtnsStatusToDefault(parentButton) {
  const btnConfirm = parentButton.querySelector(".correct-btn");
  const btnCancel = parentButton.querySelector(".cancel-btn");
  const btnsInteraction = parentButton.querySelector(".interaction-btns");

  // getting svgs
  const editBtn = SVGS.edit;
  const deleteBtn = SVGS.delete;
  
  //  REMOVE
  btnConfirm.remove();
  btnCancel.remove();
  btnsInteraction.innerHTML = editBtn + deleteBtn;

}


// hamburger event click
export const hamburgerEvent = function hamburgerEvent(){
  hamburger.addEventListener('click',function(e){
    sidebar.classList.toggle('active')
    body.style.pointerEvents = 'none'
    body.style.backgroundColor = 'rgba(0,0,0,0.5)'
    body.style. overflowY= "hidden";
    window.addEventListener('click',function(event){
     if(!event.target.closest('.sidebar') && sidebar.classList.contains('active')){
      sidebar.classList.toggle('active')
      body.style.pointerEvents = 'all'
      body.style.backgroundColor = '#fff'
      body.style. overflowY= "auto";
     }
   
   })
   // i added this because i don't want
   // the event to go up and detect the window
   // click event because if that happened then that event will fire and close the sidebar immediately
   
     e.stopPropagation()
   })
} 

// event on btn-item element
export const btnItemFunction=function (){
  Array.from(btnItems).map((item)=>{
    item.addEventListener('click',function(e){
     let text = e.target.textContent
   
     let question
     if(text.includes('"')){
        question = e.target.textContent.split('"')[1]
       input.value = question
       return
     }
     input.value = text
    })
   })
}

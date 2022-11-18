const $CARENT_DATA = document.querySelector(".current_data");

const data = new Date();
const day = ("0" + data.getDate()).slice(-2);
const month = ("0" + (data.getMonth() + 1)).slice(-2);
const year = data.getFullYear();

$CARENT_DATA.textContent = `${day}.${month}.${year}`;
//pop-up
let AddList = document.querySelector(".add_list");
let PopUp = document.querySelector(".popup");
let Btnclose = document.querySelector(".btn_close");
let Cancel = document.querySelector(".cancel");

//close and open pop-up
AddList.addEventListener("click", (e) => {
  e.preventDefault();
  PopUp.classList.toggle("active");
});

Btnclose.addEventListener("click", (e) => {
  e.preventDefault();
  PopUp.classList.toggle("active");
});

Cancel.addEventListener("click", (e) => {
  e.preventDefault();
  PopUp.classList.toggle("active");
});

window.onclick = function (event) {
  event.preventDefault();
  if (event.target == PopUp) {
    PopUp.classList.toggle("active");
  }
};

//task html
let taskTitle = document.querySelector(".add_form__item--input");
let taskDiscription = document.querySelector(".add_form__item--text");
let taskAuthor = document.querySelector(".author");
let create = document.querySelector(".create");
let counterCountNew = document.querySelector(".counter_count");
let counterCountCompl = document.querySelector(".counter_count-copl");
let columnNew = document.querySelector(".todo_column__item");
let columnCompleted = document.querySelector(".todo_column__item-completed");

//move and delete elements html
let cardDeleteNew;
let cardDeleteDone;
let cardMoveInDone;
let RemoveAllDone = document.querySelectorAll(".remove_list__done");
let RemoveAll = document.querySelectorAll(".remove_list");

//arrays
let arrayitems = JSON.parse(localStorage.getItem("toDo")) || [];
let copmpleted = JSON.parse(localStorage.getItem("copmpleted")) || [];

//delete all cards in columnNew
document.querySelectorAll(".remove_list").addEventListener("click", (e) => {
  arrayitems = [];
  updateLocal();
  rest();
});

//delete all cards in columnDone
document
  .querySelectorAll(".remove_list__done")
  .addEventListener("click", (e) => {
    copmpleted = [];
    updateLocalCopleted();
    rest();
  });

//counter
let total = () => {
  counterCountNew.innerHTML = arrayitems.length;
  counterCountCompl.innerHTML = copmpleted.length;
};

let clear = () => {
  taskTitle.value = " ";
  taskDiscription.value = " ";
  taskAuthor.value = " ";
};

let render = (el) => {
  let newCard = `<div class="card" data_id="${el.i}">
    <div class="card_head">
      <div class="card_head-logo">To do</div>
      <span class="card_date">${`${day}.${month}.${year}`}</span>
    </div>
    <div class="card_content">
      <h3 class="card_title">${el.title}</h3>
      <div class="card_text">
        <p>
          ${el.discription}
        </p>
      </div>
    </div>
    <div class="card_footer">
      <span class="card_author">${el.author}</span>
      <div class="wrap_card_remove">
          <button class="card_move">
           <i class="fa-regular fa-square-check"></i>
          </button>
          <button class="card_remove" >
          <i class="fa-solid fa-trash"></i>
          </button>
        </div>
    </div>
  </div>
    `;
  columnNew.innerHTML += newCard;
};

let ArrayFirst = () => {
  function Object(title, discription, author) {
    this.title = taskTitle.value;
    this.discription = taskDiscription.value;
    this.author = taskAuthor.value;
  }
  arrayitems.push(new Object());
};

//local arrayitems
const updateLocal = () => {
  let tostring = JSON.stringify(arrayitems);
  localStorage.setItem("toDo", tostring);
};

// local
const updateLocalCopleted = () => {
  let tostring = JSON.stringify(copmpleted);
  localStorage.setItem("copmpleted", tostring);
};

// function deletDone() {
//     cardRemoveDone = document.querySelectorAll(".card_remove");
//     cardRemoveDone.forEach((elem, id) => {
//       elem.addEventListener("click", (e) => {
//         e.target.closest(".card").remove();
//         arrayitems.splice(id, 1);
//         updateLocalCopleted();
//         updateLocal();
//         rest();
//       });
//     });
//   }

// function Move() {
//   cardMove = document.querySelectorAll(".card_move"); //перемещение во второй массив
//   cardMove.forEach((el, i) => {
//     el.addEventListener("click", (e) => {
//       copmpleted.push(arrayitems[i]);
//       getItemCompleted(copmpleted);
//       arrayitems.splice(i, 1);
//       // console.log(arrayitems);
//       updateLocal();
//       updateLocalCopleted();
//       rest();
//     });
//   });
// }

create.addEventListener("click", (e) => {
  e.preventDefault();
  ArrayFirst();
  updateLocal();
  getRender();

  // rest();
  total();
  clear();
});

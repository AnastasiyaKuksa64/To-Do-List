const $CARENT_DATA = document.querySelector(".current_data");

let AddList = document.querySelector(".add_list");
let PopUp = document.querySelector(".popup");
let Btnclose = document.querySelector(".btn_close");
let Cancel = document.querySelector(".cancel");

let taskTitle = document.querySelector(".add_form__item--input");
let taskDiscription = document.querySelector(".add_form__item--text");
let taskAuthor = document.querySelector(".author");
let column = document.querySelector(".todo_column__item");
let columnCompleted = document.querySelector(".todo_column__item-completed");
let create = document.querySelector(".create");
let counterCount = document.querySelector(".counter_count");
let counterCountCompl = document.querySelector(".counter_count-copl");
console.log(counterCountCompl);

const data = new Date();
const day = ("0" + data.getDate()).slice(-2);
const month = ("0" + (data.getMonth() + 1)).slice(-2);
const year = data.getFullYear();

$CARENT_DATA.textContent = `${day}.${month}.${year}`; //вывод даты

//появляется поп ап
AddList.addEventListener("click", (e) => {
  e.preventDefault();
  PopUp.classList.toggle("active");
});

//закрытие поп ап
Btnclose.addEventListener("click", (e) => {
  e.preventDefault();
  PopUp.classList.toggle("active");
});

//закрытие поп ап
Cancel.addEventListener("click", (e) => {
  e.preventDefault();
  PopUp.classList.toggle("active");
});

//закрытие поп ап если нажимаем на серый фон
window.onclick = function (event) {
  event.preventDefault();
  if (event.target == PopUp) {
    PopUp.classList.toggle("active");
  }
};

//массивы
let arrayitems = JSON.parse(localStorage.getItem("toDo")) || [];
let copmpleted = JSON.parse(localStorage.getItem("copmpleted")) || [];

//
let render = (el) => {
  return `<div class="card" data_id="${el.i}">
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
          <i class="fa-solid fa-arrow-right"></i>
          </button>
          <button class="card_remove" >
          <i class="fa-solid fa-trash"></i>
          </button>
        </div>
    </div>
  </div>
    `;
};

let renderDone = (el) => {
  return `<div class="card" data_id="${el.i}">
    <div class="card_head">
      <div class="card_head-logo">Done</div>
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
          <button class="card_move__inNew">
          <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button class="card_remove__done" >
          <i class="fa-solid fa-trash"></i>
          </button>
        </div>
    </div>
  </div>
    `;
};

//создание нового обьекта и помещение в первый массив
let ArrayFirst = () => {
  function Object(title, discription, author) {
    this.title = taskTitle.value;
    this.discription = taskDiscription.value;
    this.author = taskAuthor.value;
  }
  arrayitems.push(new Object());
};

// local первого массива
const updateLocal = () => {
  let tostring = JSON.stringify(arrayitems);
  localStorage.setItem("toDo", tostring);
};

// local второго массива
const updateLocalCopleted = () => {
  let tostring = JSON.stringify(copmpleted);
  localStorage.setItem("copmpleted", tostring);
};

//перебирает и выводит рендер
let getItem = (elements) => {
  column.innerHTML = " ";
  elements.forEach((element) => {
    column.innerHTML += render(element);
  });
};

let getRender = () => {
  if (arrayitems) {
    getItem(arrayitems);
  } else {
    column.innerHTML = " ";
  }
};

let getItemCompleted = (copmpleted) => {
  columnCompleted.innerHTML = " ";
  copmpleted.forEach((element) => {
    columnCompleted.innerHTML += renderDone(element);
  });
};

let total = () => {
  counterCount.innerHTML = arrayitems.length;
  counterCountCompl.innerHTML = copmpleted.length;
};

let clear = () => {
  taskTitle.value = " ";
  taskDiscription.value = " ";
  taskAuthor.value = " ";
};

let cardRemove;
let cardRemoveDone;
let RemoveAllDone = document.querySelectorAll(".remove_list__done");
let cardMove;
let cardMoveInNew;
let RemoveAll = document.querySelectorAll(".remove_list");
// console.log(RemoveAllDone);

//удаляет все карточки первого массива
function DeleteAll() {
  RemoveAll.forEach((el, id) => {
    el.addEventListener("click", (e) => {
      arrayitems = [];
      updateLocal();
      rest();
    });
  });
}

//удаляет все карточки второго массива
function DemoveAllDone() {
  RemoveAllDone.forEach((el, id) => {
    el.addEventListener("click", (e) => {
      copmpleted = [];
      updateLocalCopleted();
      rest();
    });
  });
}

//удаляет карточки по одной
function delet() {
  cardRemove = document.querySelectorAll(".card_remove");
  cardRemove.forEach((elem, id) => {
    elem.addEventListener("click", (e) => {
      e.target.closest(".card").remove();
      arrayitems.splice(id, 1);
      updateLocal();
      rest();
    });
  });
}

function deletDone() {
  cardRemoveDone = document.querySelectorAll(".card_remove__done");
  cardRemoveDone.forEach((el, id) => {
    el.addEventListener("click", (e) => {
      e.target.closest(".card").remove();
      copmpleted.splice(id, 1);
      updateLocalCopleted();
      rest();
    });
  });
}

//перенос в другой массив
function Move() {
  cardMove = document.querySelectorAll(".card_move"); //перемещение во второй массив
  cardMove.forEach((el, i) => {
    el.addEventListener("click", (e) => {
      copmpleted.push(arrayitems[i]);
      getItemCompleted(copmpleted);
      arrayitems.splice(i, 1);
      // console.log(arrayitems);
      updateLocal();
      updateLocalCopleted();
      rest();
    });
  });
}

function MoveInNew() {
  cardMoveInNew = document.querySelectorAll(".card_move__inNew");
  cardMoveInNew.forEach((el, i) => {
    el.addEventListener("click", (e) => {
      arrayitems.push(copmpleted[i]);
      getItem(arrayitems);
      copmpleted.splice(i, 1);
      // console.log(arrayitems);
      updateLocalCopleted();
      updateLocal();
      rest();
    });
  });
}
//создание карточки
create.addEventListener("click", (e) => {
  e.preventDefault();
  ArrayFirst();
  updateLocal();
  getRender();
  delet();
  Move();
  total();
  DeleteAll();
  clear();
});

//проверяет пустой ли массив и вызывает, считает карточки первого массива
let rest = () => {
  if (arrayitems || copmpleted) {
    getItem(arrayitems);
    getItemCompleted(copmpleted);
  } else {
    column.innerHTML = " ";
  }
  total();
  delet();
  deletDone();
  DeleteAll();
  DemoveAllDone();
  Move();
  MoveInNew();
};
rest();

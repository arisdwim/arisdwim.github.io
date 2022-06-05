const inputText = document.querySelector('.inputText');
const addBtn = document.querySelector('.addBtn');
const list = document.querySelector('.list');
const deleteBtn = document.querySelector('.deleteBtn');
const main = document.querySelector('.main');
const workNum = document.querySelector('.workNum');
const cardList = document.querySelector('.card-list');
const clearItem = document.querySelector('.clear-item');


let data = [];

let toggleStatus = 'all';

addBtn.addEventListener('click', addTodo);

inputText.addEventListener('keyup', e =>{
  if(e.key === 'Enter'){
    addTodo(e)
  }
});

main.addEventListener('click', changeTab);

list.addEventListener('click', deleteCheckStatus);

clearItem.addEventListener('click', deleteDone);


function deleteDone(e){
  e.preventDefault();
  data = data.filter((item) => item.checked === '')
  updateList();
}


function changeTab(e){
  toggleStatus = e.target.dataset.toggle;
  let tabs = document.querySelectorAll('.main li');
  tabs.forEach((item) => {
    item.classList.remove('active');
  })
  e.target.classList.add('active');
  updateList();
}



function updateList(){
  let showData = [];
  if (toggleStatus === 'all') {
    showData = data;
  } else if (toggleStatus === 'work') {
    showData = data.filter((item) => item.checked === '');
  } else {
    showData = data.filter((item) => item.checked === 'checked');
  }
  let todoLength = data.filter((item)=> item.checked === '');
  workNum.textContent = todoLength.length;
  render(showData);
}



function render(todo){
  if(!data.length){
    cardList.style.display = 'none';
    return;
  }
  cardList.style.display = 'block';
  let str = '';
  todo.forEach((item) => {
    str += `<li data-id="${item.id}">
            <label for="" class="checkBox">
              <input type="checkbox" ${item.checked}>
              <p>${item.value}</p>
            </label>
            <a href="#"><span class="material-icons deleteBtn">
              close
            </span></a>
          </li>`
  });
  list.innerHTML = str;
}


function addTodo(e){
  e.preventDefault();
  if (inputText.value.trim() === ""){
    alert('Enter correct information');
    return;
  };
  let obj = {};
  obj.value = inputText.value;
  obj.id = new Date().getTime();
  obj.checked = '';
  data.push(obj);
  inputText.value = '';
  updateList();
}


function deleteCheckStatus(e){
  let id = parseInt(e.target.closest('li').dataset.id);
  if (e.target.classList.contains('deleteBtn')) {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
      data = data.filter((item) => item.id !== id);
    }
  } else {
    data.forEach((item) => {
      if (item.id === id) {
        if (item.checked === 'checked') {
          item.checked = '';
        } else {
          item.checked = 'checked';
        }
      }
    })
  }
  updateList();
}







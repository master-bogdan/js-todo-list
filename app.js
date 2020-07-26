window.addEventListener('DOMContentLoaded',() => {

const form = document.querySelector('form');
const input = document.getElementById('add-task');
const list = document.querySelector('.list-group');
const warning = document.getElementById('warning-overlay');


let todoListItems = [];

// Функция рендер задачи
// Task render function
const renderTask = ({id, value, checked, strike, favorite}) => {
    list.insertAdjacentHTML('beforeend', 
    `<li id=${id} class="list-group-item ${favorite}">
        <div class="d-flex justify-content-between important">
            <div class="d-flex justify-content-between align-items-center">
            <input type="checkbox" ${checked}><span class="${strike}">${value}</span>
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <button type="button" class="btn-star btn-sm"><i class="fas fa-star"></i></button>
                <button type="button" class="btn-trash btn-sm"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div> 
    </li>`
    );
};

// Функция отрисовки заданий из локального хранилища
    // Local storage render function
const renderStorage = () => {
    if (localStorage.getItem('todo') != undefined) {
        todoListItems = JSON.parse(localStorage.getItem('todo'));
    }
    todoListItems.map((item) => renderTask(item));
};
    
renderStorage();

// Функция добавления задачи
// Function for adding tasks
const addTask = (event) => {
    event.preventDefault();
    if (input.value === '') {
       return alert('Enter your task!');
    }
    let count = todoListItems.length;
    const todoListItem = {
            id: count++, 
            value: input.value,
            checked: '', 
            strike: '',
            favorite: ''
        };
    todoListItems.push(todoListItem);
    input.value = '';
    localStorage.setItem('todo', JSON.stringify(todoListItems));
    renderTask(todoListItem);
};

form.addEventListener('submit', addTask);

// Функция удаления задачи с подтверждением
// Delete task function with confirm

const deleteTask = (event) => {
    let target = event.target;
    if (target.classList.contains('btn-trash') || target.classList.contains('fa-trash-alt')) {
        warning.style.display = 'flex';
        warning.addEventListener('click', (event) => {
            let dataConfirm = event.target.getAttribute('data');
            warning.style.display = 'none';
            if (dataConfirm == 'no') {
                return false;
            } 
            else {
                const index = todoListItems.findIndex(item => item.id == target.closest('.list-group-item').id);
                if (index !== -1) {
                    todoListItems.splice(index, 1);
                }
                target.closest('.list-group-item').remove();
            }
            localStorage.setItem('todo', JSON.stringify(todoListItems));
        });
    }
    
};

list.addEventListener('click', deleteTask);

// Функция важной задачи
// Favorite task function

const favoriteTask = (event) => {
    let target = event.target;
    if (target.classList.contains('btn-star') || target.classList.contains('fa-star')) {
        const index = todoListItems.findIndex(item => item.id == target.closest('.list-group-item').id);
        if (index !== -1 && todoListItems[index].favorite != 'bg-warning') {
            todoListItems[index].favorite = 'bg-warning';
            target.closest('.list-group-item').classList.add('bg-warning');
        } else {
            todoListItems[index].favorite = '';
            target.closest('.list-group-item').classList.remove('bg-warning');
        }
    }
    localStorage.setItem('todo', JSON.stringify(todoListItems));
};

list.addEventListener('click', favoriteTask);

// Функция выполненого задания
// Finish task function

const checkedTask = (event) => {
    let target = event.target;
    if (target.type === 'checkbox') {
        const index = todoListItems.findIndex(item => item.id == target.closest('.list-group-item').id);
        if (index !== -1 && todoListItems[index].checked == false) {
            todoListItems[index].checked = 'checked';
            todoListItems[index].strike = 'strike';
            event.target.nextSibling.classList.add('strike');
            console.log('yes');
        } 
        else {
            todoListItems[index].checked = '';
            todoListItems[index].strike = '';
            event.target.nextSibling.classList.remove('strike');
        }
        localStorage.setItem('todo', JSON.stringify(todoListItems));
    }
    
};

list.addEventListener('change', checkedTask);

console.log(todoListItems);
});
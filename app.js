window.addEventListener('DOMContentLoaded',() => {

const form = document.querySelector('form');
const input = document.querySelector('#add-task');
const list = document.querySelector('.list-group');

let todoListItems = [];

// Функция рендер задачи
// Task render function
const renderTask = (id, value, checked) => {
    list.insertAdjacentHTML('beforeend', 
    `<li id=${id} class="list-group-item">
        <div class="d-flex justify-content-between important">
            <span><input type="checkbox"> ${value} </span>
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
    todoListItems.map((item) => renderTask(item.id, item.value, item.checked, item.date));
};
    
renderStorage();

// Функция добавления задачи
// Function for adding tasks
const addTask = (event) => {
    event.preventDefault();
    let count = todoListItems.length;
    const todoListItem = {
            id: count++, 
            value: input.value, 
            checked: false,
        };
        todoListItems.push(todoListItem);
    input.value = '';
    localStorage.setItem('todo', JSON.stringify(todoListItems));
    renderTask(todoListItem.id, todoListItem.value, todoListItem.checked);
};

form.addEventListener('submit', addTask);


const deleteTask = (event) => {
    let target = event.target;
    if (target.classList.contains('btn-trash') || target.classList.contains('fa-trash-alt')) {
        // todoList.map((item, index) => {
        //     if (item.id == target.closest('.list-group-item').id) {
        //         console.log(item.id);
        //        todoList.splice(item[index], 1).sort();
        //     }
        // });
        const index = todoListItems.findIndex(item => item.id == target.closest('.list-group-item').id);
        if (index !== -1) {
            todoListItems.splice(index, 1);
        }
        target.closest('.list-group-item').remove();
    }
    localStorage.setItem('todo', JSON.stringify(todoListItems));
};

list.addEventListener('click', deleteTask);

console.log(todoListItems);
});
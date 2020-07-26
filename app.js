window.addEventListener('DOMContentLoaded',() => {

const form = document.querySelector('form');
const input = document.getElementById('add-task');
const list = document.querySelector('.list-group');
const warning = document.getElementById('warning-overlay');


let todoListItems = [];

// Функция рендер задачи
// Task render function
const renderTask = ({id, value, checked}) => {
    list.insertAdjacentHTML('beforeend', 
    `<li id=${id} class="list-group-item">
        <div class="d-flex justify-content-between important">
            <div class="d-flex justify-content-between align-items-center">
            <input type="checkbox"><span>${value}</span>
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
            checked: false,
        };
    todoListItems.push(todoListItem);
    input.value = '';
    localStorage.setItem('todo', JSON.stringify(todoListItems));
    renderTask(todoListItem);
};

form.addEventListener('submit', addTask);

// Функция удаления задачи
// Delete task function
// const warningDeleteTask = () => {
//     warning.style.display = 'flex';
//     warning.addEventListener('click', (event) => {
//         let dataConfirm = event.target.getAttribute('data');
//         warning.style.display = 'none';
//         if (dataConfirm == 'yes') {
//             return true;
//         }
//             return false;
//     });
// };


const deleteTask = (event) => {
    let target = event.target;
    if (target.classList.contains('btn-trash') || target.classList.contains('fa-trash-alt')) {
        warning.style.display = 'flex';
        warning.addEventListener('click', (event) => {
            let dataConfirm = event.target.getAttribute('data');
            warning.style.display = 'none';
            if (dataConfirm != 'yes') {
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

const checkedTask = (event) => {
    let target = event.target.checked;
    if (target) {
        event.target.nextSibling.classList.add('strike');
    }
    else {
        event.target.nextSibling.classList.remove('strike');
    }
};

list.addEventListener('change', checkedTask);

console.log(todoListItems);
});
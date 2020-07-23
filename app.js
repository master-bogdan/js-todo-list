window.addEventListener('DOMContentLoaded',() => {

const form = document.querySelector('form');
const input = document.querySelector('#add-task');
const out = document.querySelector('.list-group');

let todoList = [];

// Функция рендер задачи
// Task render function
const renderTask = (id, value, checked) => {
    out.insertAdjacentHTML('beforeend', 
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
        todoList = JSON.parse(localStorage.getItem('todo'));
    }
    todoList.map((item) => renderTask(item.id, item.value, item.checked, item.date));
};

renderStorage();

// Функция добавления задачи
// Function for adding tasks
const addTask = (event) => {
    let count = todoList.length;
    todoList.push(
        {
            id: count + 1, 
            value: input.value, 
            checked: false,
            date: Date.now()
        });
    input.value = '';
    localStorage.setItem('todo', JSON.stringify(todoList));
};

form.addEventListener('submit', addTask);

const deleteBtns = document.querySelectorAll('.btn-trash');

const deleteTask = () => {

};

deleteBtns.forEach(elem => {
    elem.addEventListener('click', (event) => {
        console.log(event.target.closest('.list-group-item').id);
        let task = event.target.closest('.list-group-item');
        todoList.map((item, index) => {
            if (item.id == task.id) {
                console.log(item.id);
               todoList.splice(item[index], 1);
            }
        });
        task.remove();
        localStorage.setItem('todo', JSON.stringify(todoList));
    });
});
console.log(todoList);

});
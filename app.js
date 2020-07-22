window.addEventListener('DOMContentLoaded',() => {

const form = document.querySelector('form');
const input = document.querySelector('#add-task');
const out = document.querySelector('.list-group');
const list = document.querySelector('.list-group');

// Функция отрисовки заданий из локального хранилища
// Local storage render function

const renderStorage = () => {
    let task = Object.entries(localStorage);
    task.map(([key, value]) => renderTask(key, value));
};

renderStorage();

// Функция добавления задачи
// Function for adding tasks
const addTask = (event) => {
    let count = localStorage.length;
    event.preventDefault();
    localStorage.setItem( count + 1 , input.value);
    renderTask(count + 1, input.value);
};

form.addEventListener('submit', addTask);

// Функция рендер задачи
// Task render function
function renderTask(id, value) {
    out.insertAdjacentHTML('beforeend', 
    `<li id=${id} class="list-group-item">
        <div class="d-flex justify-content-between important">
            <span><input type="checkbox"> ${value}</span>
            <div class="d-flex justify-content-center align-items-center">
                <button type="button" class="btn-star btn-sm"><i class="fas fa-star"></i></button>
                <button type="button" class="btn-trash btn-sm"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div> 
    </li>`
    );
}

const deleteBtns = document.querySelectorAll('.btn-trash');
deleteBtns.forEach(elem => {
    elem.addEventListener('click', (event) => {
        console.log(this.event.target.closest('.list-group-item').id);
        let item = this.event.target.closest('.list-group-item');
        localStorage.removeItem(item.id);
        item.remove();
    });
});

});
'use strict';

interface Todo {
  id: number;
  value: string;
  checked: boolean;
  strike: boolean;
  favorite: boolean;
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#add-task-form') as HTMLFormElement;
  const list = document.querySelector('.list-group') as HTMLUListElement;
  const confirmBtn = document.getElementById('confirm') as HTMLButtonElement;
  const discardBtn = document.getElementById('discard') as HTMLButtonElement;

  let todoListItems: Todo[] = [];

  // Функция рендер задачи
  // Task render function
  const renderTodo = ({id, value, checked, strike, favorite}: Todo): void => {
    if (!list) {
      return;
    }

    list.insertAdjacentHTML('beforeend', 
      `<li id=${id} class="list-group-item ${favorite}">
        <div class="d-flex justify-content-between important">
          <div class="d-flex justify-content-between align-items-center">
              <input type="checkbox" ${checked ? 'checked' : null}>
              <span class="${strike ? 'strike' : null} ml-1">
                ${value}
              </span>
          </div>
          <div class="d-flex justify-content-center align-items-center">
              <button
                data-id=${id}
                type="button"
                class="btn-star btn-sm">
                  <i class="fas fa-star"></i>
              </button>
              <button
                data-id=${id}
                type="button"
                class="btn-trash btn-sm">
                  <i class="fas fa-trash-alt"></i>
              </button>
          </div>
        </div> 
      </li>`
    );

    const deleteBtn = document.querySelectorAll('.btn-trash') as NodeListOf<HTMLButtonElement>;

    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', deleteTodo);
    })
  };

  const renderNoTodo = () => {
    if (!list) {
      return;
    }

    list.insertAdjacentHTML('beforeend', 
    `<div class="alert alert-primary text-center" role="alert">
      Add your todo
    </div>`
    )
  };

  // Функция отрисовки заданий из локального хранилища
  // Local storage render function
  const getTodos = async () => {
    try {
      const todos: Todo[] = await JSON.parse(localStorage.getItem('todo')!);

      if (typeof todos !== 'undefined' && todos.length !== 0) {
        todoListItems = [...todos];
        return todos.forEach((todo) => renderTodo(todo));
      }

      return renderNoTodo();
    } catch (error) {
      console.log(error);
    }
  };

  const saveTodoToLocalStorage = (todo: Todo) => {
    todoListItems.push(todo);
    localStorage.setItem('todo', JSON.stringify(todoListItems));
  }

  // Функция добавления задачи
  // Function for adding tasks
  const addTodo = (event: Event) => {
    event.preventDefault();
    const input = document.getElementById('add-task') as HTMLInputElement;

    if (input.value === '') {
      return alert('Enter your task!');
    };

    const todo: Todo = {
      id: Math.floor(Math.random() * 100), 
      value: input.value,
      checked: true, 
      strike: false,
      favorite: false,
    };

    input.value = '';
    saveTodoToLocalStorage(todo);
    renderTodo(todo);
  };

  // Функция удаления задачи с подтверждением
  // Delete task function with confirm

  const deleteTodo = (event: MouseEvent) => {
    const warning = document.getElementById('warning-overlay') as HTMLDivElement;
    const target = event.currentTarget as HTMLButtonElement;
    const id = target.getAttribute('data-id');

    warning.style.display = 'flex';

    confirmBtn.addEventListener('click', () => {
      const filteredTodoList = todoListItems.filter((todo) => todo.id !== Number(id));
      document.getElementById(id!)?.remove();

      localStorage.setItem('todo', JSON.stringify(filteredTodoList));
      warning.style.display = 'none';
    });

    discardBtn.addEventListener('click', () => warning.style.display = 'none');
  };

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
          } 
          else {
              todoListItems[index].checked = '';
              todoListItems[index].strike = '';
              event.target.nextSibling.classList.remove('strike');
          }
          localStorage.setItem('todo', JSON.stringify(todoListItems));
      }
  };

  getTodos();

  form.addEventListener('submit', addTodo);
  list.addEventListener('click', favoriteTask);
  list.addEventListener('change', checkedTask);
});
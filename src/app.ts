'use strict';

interface Todo {
  id: number;
  value: string;
  checked: boolean;
  favorite: boolean;
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#add-task-form') as HTMLFormElement;
  const list = document.querySelector('.list-group') as HTMLUListElement;
  const confirmBtn = document.getElementById('confirm') as HTMLButtonElement;
  const discardBtn = document.getElementById('discard') as HTMLButtonElement;

  const todos2: Todo[] = JSON.parse(localStorage.getItem('todo')!);

  // Функция рендер задачи
  // Task render function
  const renderTodo = ({id, value, checked, favorite}: Todo): void => {
    if (!list) {
      return;
    }

    list.insertAdjacentHTML('beforeend', 
      `<li id=${id} class="list-group-item ${favorite ? 'bg-warning' : null}">
        <div class="d-flex justify-content-between important">
          <div class="d-flex justify-content-between align-items-center">
              <input data-id=${id} class="done" type="checkbox" ${checked ? 'checked' : null}>
              <span class="${checked ? 'strike' : null} ml-1">
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
    const favoriteBtn = document.querySelectorAll('.btn-star') as NodeListOf<HTMLButtonElement>;
    const checkbox = document.querySelectorAll('.done') as NodeListOf<HTMLInputElement>;

    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', deleteTodo);
    });

    favoriteBtn.forEach((btn) => {
      btn.addEventListener('click', setFavoriteTodo);
    });

    checkbox.forEach((box) => {
      box.addEventListener('change', setDoneTodo);
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
  const getTodos = () => {
    const todos: Todo[] = JSON.parse(localStorage.getItem('todo')!);

    if (typeof todos !== 'undefined' && todos.length !== 0) {
      return todos.forEach((todo) => renderTodo(todo));
    }

    return renderNoTodo();
  };

  const saveTodoToLocalStorage = (todo: Todo): void => {
    const todos: Todo[] = JSON.parse(localStorage.getItem('todo')!);

    todos.push(todo);
    localStorage.setItem('todo', JSON.stringify(todos));
  }

  // Функция добавления задачи
  // Function for adding tasks
  const addTodo = (event: Event): void => {
    event.preventDefault();
    const input = document.getElementById('add-task') as HTMLInputElement;

    if (input.value === '') {
      return alert('Enter your task!');
    };

    const todo: Todo = {
      id: Math.floor(Math.random() * 100), 
      value: input.value,
      checked: false, 
      favorite: false,
    };

    input.value = '';
    saveTodoToLocalStorage(todo);
    renderTodo(todo);
  };

  // Функция удаления задачи с подтверждением
  // Delete task function with confirm

  const deleteTodo = (event: MouseEvent): void => {
    const todos: Todo[] = JSON.parse(localStorage.getItem('todo')!);
    const warning = document.getElementById('warning-overlay') as HTMLDivElement;
    const target = event.currentTarget as HTMLButtonElement;
    const id = target.getAttribute('data-id');

    warning.style.display = 'flex';

    confirmBtn.addEventListener('click', () => {
      const filteredTodoList = todos.filter((todo) => todo.id !== Number(id));
      document.getElementById(id!)?.remove();

      localStorage.setItem('todo', JSON.stringify(filteredTodoList));
      warning.style.display = 'none';
    });

    discardBtn.addEventListener('click', () => warning.style.display = 'none');
  };

  // Функция важной задачи
  // Favorite task function
  const setFavoriteTodo = (event: MouseEvent) => {
    const todos: Todo[] = JSON.parse(localStorage.getItem('todo')!);
    const target = event.currentTarget as HTMLButtonElement;
    const id = target.getAttribute('data-id');

    document.getElementById(id!)?.classList.toggle('bg-warning');

    const newTodoList = todos.map((todo) => {
      if (todo.id === Number(id)) {
        return {
          ...todo,
          favorite: !todo.favorite,
        }
      }
      
      return todo;
    });
  
    localStorage.setItem('todo', JSON.stringify(newTodoList));
  };

  // Функция выполненого задания
  // Finish task function
  const setDoneTodo = (event: Event) => {
    const todos: Todo[] = JSON.parse(localStorage.getItem('todo')!);
    const target = event.target as HTMLInputElement;
    const id = target.getAttribute('data-id');

    document.getElementById(id!)?.classList.toggle('strike');

    const newTodoList = todos.map((todo) => {
      if (todo.id === Number(id)) {
        return {
          ...todo,
          checked: !todo.checked,
        }
      }
      
      return todo;
    });

    localStorage.setItem('todo', JSON.stringify(newTodoList));
  };

  getTodos();

  form.addEventListener('submit', addTodo);
});
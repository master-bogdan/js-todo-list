'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
window.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('#add-task-form');
    var list = document.querySelector('.list-group');
    var confirmBtn = document.getElementById('confirm');
    var discardBtn = document.getElementById('discard');
    var todos2 = JSON.parse(localStorage.getItem('todo'));
    // Функция рендер задачи
    // Task render function
    var renderTodo = function (_a) {
        var id = _a.id, value = _a.value, checked = _a.checked, favorite = _a.favorite;
        if (!list) {
            return;
        }
        list.insertAdjacentHTML('beforeend', "<li id=" + id + " class=\"list-group-item " + (favorite ? 'bg-warning' : null) + "\">\n        <div class=\"d-flex justify-content-between important\">\n          <div class=\"d-flex justify-content-between align-items-center\">\n              <input data-id=" + id + " class=\"done\" type=\"checkbox\" " + (checked ? 'checked' : null) + ">\n              <span class=\"" + (checked ? 'strike' : null) + " ml-1\">\n                " + value + "\n              </span>\n          </div>\n          <div class=\"d-flex justify-content-center align-items-center\">\n              <button\n                data-id=" + id + "\n                type=\"button\"\n                class=\"btn-star btn-sm\">\n                  <i class=\"fas fa-star\"></i>\n              </button>\n              <button\n                data-id=" + id + "\n                type=\"button\"\n                class=\"btn-trash btn-sm\">\n                  <i class=\"fas fa-trash-alt\"></i>\n              </button>\n          </div>\n        </div> \n      </li>");
        var deleteBtn = document.querySelectorAll('.btn-trash');
        var favoriteBtn = document.querySelectorAll('.btn-star');
        var checkbox = document.querySelectorAll('.done');
        deleteBtn.forEach(function (btn) {
            btn.addEventListener('click', deleteTodo);
        });
        favoriteBtn.forEach(function (btn) {
            btn.addEventListener('click', setFavoriteTodo);
        });
        checkbox.forEach(function (box) {
            box.addEventListener('change', setDoneTodo);
        });
    };
    var renderNoTodo = function () {
        if (!list) {
            return;
        }
        list.insertAdjacentHTML('beforeend', "<div class=\"alert alert-primary text-center\" role=\"alert\">\n        Add your todo\n      </div>");
    };
    // Функция отрисовки заданий из локального хранилища
    // Local storage render function
    var getTodos = function () {
        var todos = JSON.parse(localStorage.getItem('todo'));
        if (typeof todos !== 'undefined' && todos.length !== 0) {
            return todos.forEach(function (todo) { return renderTodo(todo); });
        }
        return renderNoTodo();
    };
    var saveTodoToLocalStorage = function (todo) {
        var todos = JSON.parse(localStorage.getItem('todo'));
        todos.push(todo);
        localStorage.setItem('todo', JSON.stringify(todos));
    };
    // Функция добавления задачи
    // Function for adding tasks
    var addTodo = function (event) {
        event.preventDefault();
        var input = document.getElementById('add-task');
        if (input.value === '') {
            return alert('Enter your task!');
        }
        ;
        var todo = {
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
    var deleteTodo = function (event) {
        var todos = JSON.parse(localStorage.getItem('todo'));
        var warning = document.getElementById('warning-overlay');
        var target = event.currentTarget;
        var id = target.getAttribute('data-id');
        warning.style.display = 'flex';
        confirmBtn.addEventListener('click', function () {
            var _a;
            var filteredTodoList = todos.filter(function (todo) { return todo.id !== Number(id); });
            (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.remove();
            localStorage.setItem('todo', JSON.stringify(filteredTodoList));
            warning.style.display = 'none';
        });
        discardBtn.addEventListener('click', function () { return warning.style.display = 'none'; });
    };
    // Функция важной задачи
    // Favorite task function
    var setFavoriteTodo = function (event) {
        var _a;
        var todos = JSON.parse(localStorage.getItem('todo'));
        var target = event.currentTarget;
        var id = target.getAttribute('data-id');
        (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.classList.toggle('bg-warning');
        var newTodoList = todos.map(function (todo) {
            if (todo.id === Number(id)) {
                return __assign(__assign({}, todo), { favorite: !todo.favorite });
            }
            return todo;
        });
        localStorage.setItem('todo', JSON.stringify(newTodoList));
    };
    // Функция выполненого задания
    // Finish task function
    var setDoneTodo = function (event) {
        var _a;
        var todos = JSON.parse(localStorage.getItem('todo'));
        var target = event.target;
        var id = target.getAttribute('data-id');
        (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.classList.toggle('strike');
        var newTodoList = todos.map(function (todo) {
            if (todo.id === Number(id)) {
                return __assign(__assign({}, todo), { checked: !todo.checked });
            }
            return todo;
        });
        localStorage.setItem('todo', JSON.stringify(newTodoList));
    };
    getTodos();
    form.addEventListener('submit', addTodo);
});

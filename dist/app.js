'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
window.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('#add-task-form');
    var list = document.querySelector('.list-group');
    var confirmBtn = document.getElementById('confirm');
    var discardBtn = document.getElementById('discard');
    var todoListItems = [];
    // Функция рендер задачи
    // Task render function
    var renderTodo = function (_a) {
        var id = _a.id, value = _a.value, checked = _a.checked, strike = _a.strike, favorite = _a.favorite;
        if (!list) {
            return;
        }
        list.insertAdjacentHTML('beforeend', "<li id=" + id + " class=\"list-group-item " + favorite + "\">\n        <div class=\"d-flex justify-content-between important\">\n          <div class=\"d-flex justify-content-between align-items-center\">\n              <input type=\"checkbox\" " + (checked ? 'checked' : null) + ">\n              <span class=\"" + (strike ? 'strike' : null) + " ml-1\">\n                " + value + "\n              </span>\n          </div>\n          <div class=\"d-flex justify-content-center align-items-center\">\n              <button\n                data-id=" + id + "\n                type=\"button\"\n                class=\"btn-star btn-sm\">\n                  <i class=\"fas fa-star\"></i>\n              </button>\n              <button\n                data-id=" + id + "\n                type=\"button\"\n                class=\"btn-trash btn-sm\">\n                  <i class=\"fas fa-trash-alt\"></i>\n              </button>\n          </div>\n        </div> \n      </li>");
        var deleteBtn = document.querySelectorAll('.btn-trash');
        deleteBtn.forEach(function (btn) {
            btn.addEventListener('click', deleteTodo);
        });
    };
    var renderNoTodo = function () {
        if (!list) {
            return;
        }
        list.insertAdjacentHTML('beforeend', "<div class=\"alert alert-primary text-center\" role=\"alert\">\n      Add your todo\n    </div>");
    };
    // Функция отрисовки заданий из локального хранилища
    // Local storage render function
    var getTodos = function () { return __awaiter(void 0, void 0, void 0, function () {
        var todos, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, JSON.parse(localStorage.getItem('todo'))];
                case 1:
                    todos = _a.sent();
                    if (typeof todos !== 'undefined' && todos.length !== 0) {
                        todoListItems = __spreadArray([], todos);
                        return [2 /*return*/, todos.forEach(function (todo) { return renderTodo(todo); })];
                    }
                    return [2 /*return*/, renderNoTodo()];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var saveTodoToLocalStorage = function (todo) {
        todoListItems.push(todo);
        localStorage.setItem('todo', JSON.stringify(todoListItems));
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
    var deleteTodo = function (event) {
        var warning = document.getElementById('warning-overlay');
        var target = event.currentTarget;
        var id = target.getAttribute('data-id');
        warning.style.display = 'flex';
        confirmBtn.addEventListener('click', function () {
            var _a;
            var filteredTodoList = todoListItems.filter(function (todo) { return todo.id !== Number(id); });
            (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.remove();
            localStorage.setItem('todo', JSON.stringify(filteredTodoList));
            warning.style.display = 'none';
        });
        discardBtn.addEventListener('click', function () { return warning.style.display = 'none'; });
    };
    // Функция важной задачи
    // Favorite task function
    var favoriteTask = function (event) {
        var target = event.target;
        if (target.classList.contains('btn-star') || target.classList.contains('fa-star')) {
            var index = todoListItems.findIndex(function (item) { return item.id == target.closest('.list-group-item').id; });
            if (index !== -1 && todoListItems[index].favorite != 'bg-warning') {
                todoListItems[index].favorite = 'bg-warning';
                target.closest('.list-group-item').classList.add('bg-warning');
            }
            else {
                todoListItems[index].favorite = '';
                target.closest('.list-group-item').classList.remove('bg-warning');
            }
        }
        localStorage.setItem('todo', JSON.stringify(todoListItems));
    };
    // Функция выполненого задания
    // Finish task function
    var checkedTask = function (event) {
        var target = event.target;
        if (target.type === 'checkbox') {
            var index = todoListItems.findIndex(function (item) { return item.id == target.closest('.list-group-item').id; });
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

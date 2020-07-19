const form = document.querySelector('form');
const input = document.querySelector('#add-task');
const out = document.querySelector('.list-group');

const test = (event) => {
    event.preventDefault();
    console.log('test');
    console.log(input.value);
    // localStorage.setItem(input.value, 'test');
    out.insertAdjacentHTML('afterbegin', `<li class="list-group-item">${input.value}</li>`);
};

form.addEventListener('submit', test);

function render() {

}
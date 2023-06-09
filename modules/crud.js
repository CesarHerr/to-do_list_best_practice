import Todo from './todo.js';

const mainList = document.querySelector('.tasks');

class TodoList {
  constructor() {
    this.list = JSON.parse(localStorage.getItem('list')) || [];
    this.enterEvent();
  }

  add(text) {
    const newTodo = new Todo(text);
    newTodo.index = this.list.length + 1;
    this.list.push(newTodo);
    localStorage.setItem('list', JSON.stringify(this.list));
    this.indexes();
    this.displayList();
  }

  remove(index) {
    this.list.splice(index, 1);
    this.indexes();
    localStorage.setItem('list', JSON.stringify(this.list));
    this.displayList();
  }

  edit(index, newText) {
    this.list[index].text = newText;
    localStorage.setItem('list', JSON.stringify(this.list));
    this.displayList();
  }

  displayList() {
    mainList.innerHTML = this.list
      .map(
        (todo, index) => `
        <li class="taskElement_master">
          <span >           
          <input type="checkbox" class="checkbox" data-index="${index}">
            <label for="name${index}"></label>
            <input name="name${index}" class="taskElement" data-task-index="${index}" value="${todo.text}"></input>             
          </span>          
          <i class="fa-regular fa-trash-can" data-list-index="${index}"></i>      
        </li>
      `,
      )
      .join('');
  }

  indexes() {
    this.list.forEach((todo, index) => {
      todo.index = index + 1;
    });
  }

  addRemoveBtnListeners() {
    mainList.addEventListener('click', (event) => {
      if (event.target.classList.contains('fa-trash-can')) {
        const index = event.target.dataset.listIndex;
        this.remove(index);
      }
    });
  }

  enterEvent() {
    document.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        if (event.target.classList.contains('taskElement')) {
          const newText = event.target.value;
          const index = event.target.dataset.taskIndex;
          this.edit(index, newText);
        }
      }
    });
  }
}

export default TodoList;
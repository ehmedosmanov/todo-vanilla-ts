"use strict";
const addForm = document.querySelector(".add");
const addInput = addForm.querySelector("input[name='add']");
const deleteIcon = document.querySelector(".delete");
const searchForm = document.querySelector(".search");
const searchInput = searchForm.querySelector("input[name='search']");
class Task {
    constructor(text, isCompleted = false) {
        this.text = text;
        this.isCompleted = isCompleted;
        this.text = text;
        this.isCompleted = isCompleted;
    }
}
class TodoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("todos") || "[]") || [];
    }
    render(tasks = this.tasks) {
        const tasksLIst = document.querySelector(".list-group");
        tasksLIst.innerHTML = "";
        tasks.forEach((task, index) => {
            const liElement = document.createElement("li");
            liElement.className = `list-group-item d-flex justify-content-between align-items-center ${task.isCompleted ? "completed" : ""}`;
            liElement.innerHTML = `
          <span>${task.text}</span>
          <i class="far fa-trash-alt delete" data-index="${index}"></i>
        `;
            tasksLIst.appendChild(liElement);
            liElement.addEventListener("click", (e) => {
                e.preventDefault();
                const target = e.target;
                if (target.tagName === "I") {
                    const index = target.getAttribute("data-index");
                    if (index !== null) {
                        todoList.removeTodo(+index);
                    }
                }
                else {
                    this.toggleCompleted(index);
                }
            });
        });
    }
    addTask(text) {
        if (!text.trim()) {
            alert("Not Empty Write Task");
        }
        else {
            this.tasks.push(new Task(text.trim()));
            this.updateLocalStorage();
            this.render();
        }
    }
    searchTodo(searchText) {
        if (searchText.trim()) {
            const filteredTask = this.tasks.filter((task) => task.text.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
            this.render(filteredTask);
        }
        else {
            this.render();
        }
    }
    removeTodo(id) {
        this.tasks.splice(id, 1);
        const getItems = localStorage.getItem("todos");
        if (getItems !== null) {
            const tasksArray = JSON.parse(getItems);
            tasksArray.splice(id, 1);
            this.updateLocalStorage();
        }
        this.render();
    }
    toggleCompleted(index) {
        const task = this.tasks[index];
        if (task) {
            task.isCompleted = !task.isCompleted;
            this.updateLocalStorage();
            this.render();
        }
    }
    updateLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.tasks));
    }
}
const todoList = new TodoList();
//! Add Todo
addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    todoList.addTask(addInput.value);
    addInput.value = "";
});
//! Search Todo
searchInput.addEventListener("input", (e) => {
    const target = e.target;
    const searchValue = target.value;
    todoList.searchTodo(searchValue);
});
window.addEventListener("DOMContentLoaded", () => {
    todoList.render();
});

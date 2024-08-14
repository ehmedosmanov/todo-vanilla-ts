const addForm = document.querySelector(".add") as HTMLFormElement;
const addInput = addForm.querySelector("input[name='add']") as HTMLInputElement;
const deleteIcon = document.querySelector(".delete") as HTMLElement;
const searchForm = document.querySelector(".search") as HTMLFormElement;
const searchInput = searchForm.querySelector(
  "input[name='search']"
) as HTMLInputElement;

class Task {
  constructor(public text: string, public isCompleted: boolean = false) {
    this.text = text;
    this.isCompleted = isCompleted;
  }
}

class TodoList {
  private tasks: Task[] =
    (JSON.parse(localStorage.getItem("todos") || "[]") as Task[]) || [];

  public render(tasks: Task[] = this.tasks): void {
    const tasksLIst = document.querySelector(".list-group") as HTMLUListElement;
    tasksLIst.innerHTML = "";

    tasks.forEach((task: Task, index: number) => {
      const liElement = document.createElement("li");
      liElement.className = `list-group-item d-flex justify-content-between align-items-center ${
        task.isCompleted ? "completed" : ""
      }`;

      liElement.innerHTML = `
          <span>${task.text}</span>
          <i class="far fa-trash-alt delete" data-index="${index}"></i>
        `;
      tasksLIst.appendChild(liElement);

      liElement.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (target.tagName === "I") {
          const index = target.getAttribute("data-index");
          if (index !== null) {
            todoList.removeTodo(+index);
          }
        } else {
          this.toggleCompleted(index);
        }
      });
    });
  }

  public addTask(text: string): void {
    if (!text.trim()) {
      alert("Not Empty Write Task");
    } else {
      this.tasks.push(new Task(text.trim()));
      this.updateLocalStorage();
      this.render();
    }
  }

  public searchTodo(searchText: string): void {
    if (searchText.trim()) {
      const filteredTask = this.tasks.filter((task) =>
        task.text.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      );
      this.render(filteredTask);
    } else {
      this.render();
    }
  }

  public removeTodo(id: number): void {
    this.tasks.splice(id, 1);
    const getItems = localStorage.getItem("todos");
    if (getItems !== null) {
      const tasksArray: Task[] = JSON.parse(getItems);
      tasksArray.splice(id, 1);
      this.updateLocalStorage();
    }
    this.render();
  }

  public toggleCompleted(index: number): void {
    const task = this.tasks[index];
    if (task) {
      task.isCompleted = !task.isCompleted;
      this.updateLocalStorage();
      this.render();
    }
  }

  private updateLocalStorage(): void {
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
  const target = e.target as HTMLInputElement;
  const searchValue = target.value;
  todoList.searchTodo(searchValue);
});

window.addEventListener("DOMContentLoaded", () => {
  todoList.render();
});

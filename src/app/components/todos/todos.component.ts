import { Component, OnInit } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "src/app/types/Todo";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"],
})
export class TodosComponent implements OnInit {
  private todos: Todo[] = [];
  private todoService: TodoService;

  public constructor(todoService: TodoService) {
    this.todoService = todoService;
  }

  public async ngOnInit() {
    const todos = await this.todoService.get();
    this.setTodos(todos);
  }

  public setTodos(todos: Todo[]) {
    this.todos = todos;
  }

  public getTodos() {
    return this.todos;
  }

  public deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(function (t) {
      return t.id !== todo.id;
    });
  }

  public addTodo(todo: Todo) {
    this.todos.push(todo);
  }
}

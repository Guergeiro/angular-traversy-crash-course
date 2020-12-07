import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "src/app/types/Todo";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"],
})
export class TodoItemComponent implements OnInit {
  @Input() todo?: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  private icon = faTimes;
  private todoService: TodoService;

  public constructor(todoService: TodoService) {
    this.todoService = todoService;
  }

  ngOnInit(): void {}

  public getIcon() {
    return this.icon;
  }

  public async onToggle() {
    if (this.todo) {
      this.todo.completed = !this.todo.completed;

      await this.todoService.put(this.todo);
    }
  }

  public async onDelete(todo?: Todo) {
    if (todo) {
      await this.todoService.delete(todo);
      this.deleteTodo.emit(todo);
    }
  }
}

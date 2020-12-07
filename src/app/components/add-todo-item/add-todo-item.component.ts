import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "src/app/types/Todo";

@Component({
  selector: "app-add-todo-item",
  templateUrl: "./add-todo-item.component.html",
  styleUrls: ["./add-todo-item.component.css"],
})
export class AddTodoItemComponent implements OnInit {
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter();
  private form = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(3)]),
  });
  private todoService: TodoService;
  private icon = faPlus;

  public constructor(todoService: TodoService) {
    this.todoService = todoService;
  }

  public ngOnInit() {}

  public getIcon() {
    return this.icon;
  }

  public getForm() {
    return this.form;
  }

  public async onAdd(todo: Omit<Todo, "id">) {
    const newTodo = await this.todoService.post(todo);

    this.addTodo.emit(newTodo);
  }

  public onSubmit(form: FormGroup) {
    this.onAdd({
      title: form.value["title"],
      completed: false,
    });
  }
}

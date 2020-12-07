import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "../types/Todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private http: HttpClient;
  private uri = "https://jsonplaceholder.typicode.com/todos";

  public constructor(http: HttpClient) {
    this.http = http;
  }

  public get() {
    return this.http.get<Todo[]>(`${this.uri}?_limit=5`).toPromise();
  }

  public put(todo: Todo) {
    return this.http
      .put<Todo>(`${this.uri}/${todo.id}`, todo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .toPromise();
  }

  public delete(todo: Todo) {
    return this.http.delete<void>(`${this.uri}/${todo.id}`).toPromise();
  }

  public post(todo: Omit<Todo, "id">) {
    return this.http
      .post<Todo>(`${this.uri}`, todo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .toPromise();
  }
}

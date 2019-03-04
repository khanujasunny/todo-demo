import { LoadingService } from './../loading.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  private todoList;
  public inputTodo;
  private baseUrl = 'http://localhost:3000/api/v1/todo';
  constructor(public loadingService: LoadingService) {
    this.getTodoList();
  }

  ngOnInit() {}

  private getTodoList(){
    this.loadingService.present();
    this.doTodoList().then(list => {
      this.loadingService.dismiss();
      this.todoList = list.reverse();
    });
  }

  public onAddTodo(){
    if(this.inputTodo && this.inputTodo.trim().length){
      this.loadingService.present();
      this.doAddTodo(this.inputTodo).then(data =>{
        console.info(data);
        this.inputTodo = '';
        this.loadingService.dismiss();
        this.getTodoList();
      });
    }
  }

  public deleteTodo(todoObj){
    this.loadingService.present();
    this.doDeleteTodo(todoObj).then(data => {
      this.loadingService.dismiss();
      this.getTodoList();
    });
  }



  private doTodoList(){
    return fetch(this.baseUrl).then((res: Response) => {
      if(res.status === 200){
        return res.json();
      } else {
        return {success: false};
      }
    }).then((res) => {
      return res.data;
    }).catch(error => console.warn(error));
  }

  private doAddTodo(item) {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({todo: item})
    }).then((res: Response) => {
      if(res.status === 200){
        return res.json();
      } else {
        return {success: false};
      }
    }).then((res) => {
      return res.data;
    }).catch(error => console.warn(error));
  }


  private doDeleteTodo(todoObj) {
    return fetch(this.baseUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoObj)
    }).then((res: Response) => {
      if(res.status === 200){
        return res.json();
      } else {
        return {success: false};
      }
    }).then((res) => {
      return res.data;
    }).catch(error => console.warn(error));
  }

}

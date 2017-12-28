import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AddTaskModalPage } from "../add-task-modal/add-task-modal";
import { TodoServiceProvider } from "../../providers/todo-service/todo-service";
import { ListModel} from "../../data/list-model";
import {TodoModel} from "../../data/todo-model";

/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html'
})
export class TodosPage {

  private list:ListModel;

  constructor(public navCtrl : NavController,
              public navParams : NavParams,
              private modalCtrl : ModalController,
              public todoService : TodoServiceProvider,
              private loadingCtrl : LoadingController) {
    this.list = this.navParams.get('list');
    this.todoService.loadFromList(this.list.id);
  }

  ionViewWillUnload(){ //ionic lifecycle predefined method
    this.todoService.saveStorage(this.list.id);
  }

  addTodo(todo:TodoModel){
    let loader = this.loadingCtrl.create();
    loader.present();
    this.todoService.saveNewItem(todo)
      .subscribe(()=>loader.dismiss(),
        ()=>loader.dismiss());
  }

  addItem():void{
    let modal = this.modalCtrl.create(AddTaskModalPage, {listId: this.list.id});
    modal.present();

    modal.onDidDismiss( data => {
      if(data)
        this.addTodo(data);
    });
  }

  editTodo(todo):void{
    let modal = this.modalCtrl.create(AddTaskModalPage, {todo});
    modal.present();

    modal.onDidDismiss( data => {
      if(data)
        this.updateTodo(todo, data);
    });
  }

  updateTodo(todo:TodoModel, modifiedTodo: TodoModel){
    let loader = this.loadingCtrl.create();
    loader.present();
    this.todoService.saveEditItem(todo, modifiedTodo)
      .subscribe(()=> loader.dismiss(),
        ()=> loader.dismiss());
  }

  removeTodo(item:any):void{
    this.todoService.removeTodo(item);
  }

  toogleChecked(item):void{
    this.todoService.toogleChecked(item);
  }

}

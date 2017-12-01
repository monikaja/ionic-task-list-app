import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AddTaskModalPage} from "../add-task-modal/add-task-modal";

/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {

  public todos: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodosPage');
    this.todos = [
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'checked Task', isDone: true},
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'checked Task', isDone: true},
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'hola que tal esto es una tarea', isDone: false}
    ];
  }

  toogleChecked(item):void{
    item.isDone = !item.Done;
  }

  addItem():void{
    // this.todos.push({desc: 'new item', isDone: false});
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();

    modal.onDidDismiss( data => {
      if(data)
        this.saveNewItem(data);
    });
  }

  saveNewItem(item:any):void{
    this.todos.push(item);
  }
}

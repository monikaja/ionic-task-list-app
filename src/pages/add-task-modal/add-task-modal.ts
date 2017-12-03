import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddTaskModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-task-modal',
  templateUrl: 'add-task-modal.html',
})
export class AddTaskModalPage {

  public model = {desc:'', isDone:''};
  public tittle: string = "Add new task";
  public buttonText:string = "ADD";

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    if(this.navParams.get('todo')){
      this.model = this.clone(this.navParams.get('todo'));
      this.tittle = "Edit task";
      this.buttonText = "Save changes";
    }
  }

  clone(todo){
    return {desc: todo.desc, isDone: todo.isDone};
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  save(model){
    console.log(model);
    this.viewCtrl.dismiss(this.model);
  }
}

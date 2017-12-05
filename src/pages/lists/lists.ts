import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodosPage} from "../todos/todos";
import { AlertController} from "ionic-angular";

import { ListServiceProvider} from "../../providers/list-service/list-service";

/**
 * Generated class for the ListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public listService:ListServiceProvider) {
  }

  goToList(list:string):void{
    this.navCtrl.push(TodosPage);
  }

  showAddList(){
    let addListalert = this.alertCtrl.create( {
      title: "New list",
      message: "Write a name",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {}
        },
        {
          text: 'Accept',
          handler: data => {this.addList(data.name)}
        }
      ]
    });

    addListalert.present();
  }

  addList(name:string):void{
    this.listService.addList(name);
  }
}

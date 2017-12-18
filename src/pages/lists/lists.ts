import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TodosPage} from "../todos/todos";
import { AlertController} from "ionic-angular";

import { ListServiceProvider} from "../../providers/list-service/list-service";
import { ListModel} from "../../data/list-model";

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
              public alertCtrl: AlertController, public listService:ListServiceProvider,
              private loadingCtrl: LoadingController) {
  }

  goToList(list: ListModel):void{
    this.navCtrl.push(TodosPage, {list});
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
          handler: () => {
            addListalert.dismiss();
            return false;//fix alert
          }
        },
        {
          text: 'Accept',
          handler: data => {
            let navTransition = addListalert.dismiss();
            navTransition.then(()=> {
              this.addList(data.name)
            });
            return false;//fix alert
          }
        }
      ]
    });

    addListalert.present();
  }

  addList(name:string):void{
    let loader = this.loadingCtrl.create();
    loader.present();

    this.listService.addList(name)
      .subscribe( list => {
        this.goToList(list);
        loader.dismiss();
      },
        error => {
          loader.dismiss();
        });

  }
}

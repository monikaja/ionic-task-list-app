import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodosPage } from './todos';
import { DoneTodosPipe} from "../../pipes/done-todos/done-todos";
import { UndoneTodosPipe} from "../../pipes/undone-todos/undone-todos";

@NgModule({
  declarations: [
    TodosPage,
  ],
  imports: [
    IonicPageModule.forChild(TodosPage),
    DoneTodosPipe,
    UndoneTodosPipe
  ],
})
export class TodosPageModule {}

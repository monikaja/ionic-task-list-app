import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodosPage } from './todos';
import { SharedModule} from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    TodosPage,
  ],
  imports: [
    IonicPageModule.forChild(TodosPage),
    SharedModule
  ],
})
export class TodosPageModule {}

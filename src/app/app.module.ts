import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TodosPage } from '../pages/todos/todos';
import { AddTaskModalPage } from "../pages/add-task-modal/add-task-modal";
import { TodoServiceProvider } from '../providers/todo-service/todo-service';
import { HttpClientModule } from '@angular/common/http';
import { DoneTodosPipe} from "../pipes/done-todos-page/done-todos-page";

@NgModule({
  declarations: [
    MyApp,
    TodosPage,
    AddTaskModalPage,
    DoneTodosPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TodosPage,
    AddTaskModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TodoServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

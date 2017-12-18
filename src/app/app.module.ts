import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TodosPage } from '../pages/todos/todos';
import { AddTaskModalPage } from "../pages/add-task-modal/add-task-modal";
import { ListsPage} from "../pages/lists/lists";
import { TodoServiceProvider } from '../providers/todo-service/todo-service';
import { DoneTodosPipe } from "../pipes/done-todos/done-todos";
import { UndoneTodosPipe } from "../pipes/undone-todos/undone-todos";
import { ListServiceProvider } from '../providers/list-service/list-service';
import { IonicStorageModule } from '@ionic/storage';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    MyApp,
    TodosPage,
    DoneTodosPipe,
    UndoneTodosPipe,
    AddTaskModalPage,
    ListsPage
  ],
  imports: [
    BrowserModule,
    // HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TodosPage,
    AddTaskModalPage,
    ListsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TodoServiceProvider,
    ListServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

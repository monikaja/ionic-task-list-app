import { NgModule } from '@angular/core';
import { DoneTodosPipe } from './done-todos/done-todos';
import { UndoneTodosPipe } from './undone-todos/undone-todos';
@NgModule({
	declarations: [DoneTodosPipe, UndoneTodosPipe],
	imports: [],
	exports: [DoneTodosPipe, UndoneTodosPipe]
})
export class SharedModule {}

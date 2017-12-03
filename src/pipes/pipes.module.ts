import { NgModule } from '@angular/core';
import { DoneTodosPagePipe } from './done-todos-page/done-todos-page';
@NgModule({
	declarations: [DoneTodosPagePipe],
	imports: [],
	exports: [DoneTodosPagePipe]
})
export class PipesModule {}

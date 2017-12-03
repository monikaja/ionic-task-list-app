import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DoneTodosPagePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'doneTodosPipe',
  pure: false
})
export class DoneTodosPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(todos: any[]) {
    return todos.filter(todo => todo.isDone);
  }
}

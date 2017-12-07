import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the UndoneTodosPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'undoneTodosPipe',
  pure: false
})
export class UndoneTodosPipe implements PipeTransform {

  transform(todos: any[]) {
    return todos.filter(todo => !todo.isDone);
  }
}

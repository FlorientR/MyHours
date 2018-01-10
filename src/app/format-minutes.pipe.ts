import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMinutes'
})
export class FormatMinutesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      let minutes = value % 60;
      let hours = (value - minutes) / 60;

      hours = parseInt('' + hours);

      return (hours < 10 ? '0' + hours : hours) + 'h'
          + (minutes < 10 ? '0' + minutes : minutes);
  }

}

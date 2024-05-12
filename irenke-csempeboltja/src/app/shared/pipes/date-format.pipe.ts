import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let tzOffset = (new Date(value)).getTimezoneOffset() * 60000;
    let dateTime = new Date(new Date(value).getTime() - tzOffset);
    let costumeDateTime: string = dateTime.toISOString().substring(0, 10).replaceAll('-', ". ") + ".";
    return costumeDateTime;
  }

}

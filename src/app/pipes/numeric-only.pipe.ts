import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numericOnly',
  standalone: true
})
export class NumericOnlyPipe implements PipeTransform {
  transform(value: any): string {
    // Check if value is numeric using isNaN
    // isNaN returns false for numeric strings and numbers
    return (!isNaN(value) && value !== null && value !== '') ? value : '';
  }
} 
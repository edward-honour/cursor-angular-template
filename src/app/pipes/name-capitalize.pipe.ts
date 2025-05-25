import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameCapitalize',
  standalone: true
})
export class NameCapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    // Split the full name into parts
    return value.split(' ')
      .map(name => {
        if (!name) return '';
        // Capitalize first letter and lowercase the rest
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      })
      .join(' ');
  }
} 
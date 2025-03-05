import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kgToG',
  standalone: true, 
})
export class KgToGPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '';
    const grams = value * 1000; 
    return `${grams}g`; 
  }
}

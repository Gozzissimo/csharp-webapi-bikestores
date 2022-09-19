import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../dto/Brand.interface';

@Pipe({
  name: 'filterBrand'
})
export class FilterPipe implements PipeTransform {

  transform(brands: Brand[], filterText: string) {
    if (brands.length === 0 || filterText === '') {
      return brands;
    } else {
      return brands.filter((brand) => {
        return brand.brandName.toLowerCase() === filterText.toLowerCase()
      })
    }
  }
}

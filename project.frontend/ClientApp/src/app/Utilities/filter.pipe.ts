import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../dto/Brand.interface';
import { IFilter } from '../dto/ifilter';
import { Product } from '../dto/Product.interface';

@Pipe({
  name:'filterBrand'
})

export class FilterBrand implements PipeTransform {

  transform(elements: Brand[], filterText: string) {
    if (!elements || elements.length === 0 || filterText === '') {
      return elements;
    } else {
      return elements.filter((el) => {
        return el.brandName.toLowerCase().includes(filterText.toLowerCase())
      })
    }
  }
}

@Pipe({
  name: 'filterProduct'
})

export class FilterProduct implements IFilter<Product>, PipeTransform {

  transform(elements: Product[], filterText: string) {
    if (!elements || elements.length === 0 || filterText === '') {
      return elements;
    } else {
      return elements.filter((el) => {
        return el.productName.toLowerCase().includes(filterText.toLowerCase())
      })
    }
  }
}

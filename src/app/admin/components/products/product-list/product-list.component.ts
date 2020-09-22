import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../products.service'
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs'
// import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList:any=[];
  constructor(private productService: ProductsService) { }
  ngOnInit(): void {
    this.getAllProductList()
  }
  public getAllProductList()
  {
      
      console.log('coming');
      
      const inputData :any= {"business_userId":22,"offset":"0","limit":"20","filters":{"cat_1":[],"cat_2":[],"cat_3":[],"sizes":[],"area":[]},"sorting":"price_asc"};

      this.productService.getAllProductList(inputData).subscribe((data: any)=>{
        console.log(data)
        if(data.status == 'success')
        {
          this.productList =  data.data
        }
    })
  }
}

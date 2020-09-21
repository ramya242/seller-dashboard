import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import {ProductsService} from '../../products.service'
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    productId:any;
    productData:any=[];
    constructor(private productService: ProductsService,private activatedRoute: ActivatedRoute) { 

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.productId=params.id;
        this.productDetails()
      }
      })
  }
  public productDetails()
  {
    const inputData :any= {"productId":this.productId};

    this.productService.productDetails(inputData).subscribe((data: any)=>{
      console.log(data)
      if(data.status == 'success')
      {
        this.productData =  data.data
      }
  })
  }

  ngOnInit(): void {
  }

}

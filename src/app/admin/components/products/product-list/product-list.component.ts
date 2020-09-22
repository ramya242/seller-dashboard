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
 public getAllProductList(){
    
    console.log('coming');
    
    const inputData :any= {"business_userId":22,"offset":"0","limit":"20","filters":{"cat_1":[],"cat_2":[],"cat_3":[],"sizes":[],"area":[]},"sorting":"price_asc"};

    this.productService.getAllProductList(inputData).subscribe((data: any)=>{
      console.log(data)
  })
  //   var headers = new HttpHeaders({'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC92MVwvdXNlclwvbG9naW4iLCJpYXQiOjE2MDA2MDczNDMsImV4cCI6MTYwMDYyNTM0MywibmJmIjoxNjAwNjA3MzQzLCJqdGkiOiI3Vmowb2hTaXc4QVhUSEFUIiwic3ViIjo2MzAsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.e-JBpKDlWv0qjCeZFT65TMBU2yRzOMUAWxmSf_1AB2E', 'Content-Type': 'application/json'});
            
  //       this.http.post<any>(this.URL, data, { headers: headers}).subscribe(resultData => {
  //            console.log(resultData);
  //         });
   }
}

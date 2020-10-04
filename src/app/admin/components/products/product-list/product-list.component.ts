import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../products.service'
import {AdminService} from '../../../shared/services/admin.service'
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
  profileInfo:any=[];
  categoriesList:any=[]
  subCategoriesList:any=[]
  subSubCategoriesList:any=[]
  availabilitySizes:any=[]
  productAreas:any =[]
  constructor(private productService: ProductsService,private adminService: AdminService) { }
  ngOnInit(): void {
    this.getProfileInfo()
    this.categories()
    this.getProductAreas()
    
  }
  public getAllProductList()
  {
      
      console.log('coming');

      const inputData :any= {"business_userId":this.profileInfo.id,"offset":"0","limit":"20","filters":{"cat_1":[],"cat_2":[],"cat_3":[],"sizes":[],"area":[]},"sorting":"price_asc"};

      this.productService.getAllProductList(inputData).subscribe((data: any)=>{
        console.log(data)
        if(data.status == 'success')
        {
          this.productList =  data.data
        }
    })
  }
  public getProfileInfo()
  {
      this.adminService.getProfileInfo().subscribe((data: any)=>{
        console.log(data)
        if(data.status == 'success')
        {
          this.profileInfo =  data.data
          this.getAllProductList()
        }
    })
  }
  public categories(level='level1',id='')
  {
    this.productService.subCategories(level,id).subscribe((data: any)=>{
      console.log(data);
      if(data.status == 'success')
      {
        if(level=='level1')
        {
          this.categoriesList =  data.data
        }
        if(level=='level2')
        {
          this.subCategoriesList =  data.data
        }
        if(level=='level3')
        {
          this.subSubCategoriesList =  data.data
        }
        
      }
     
    }) 
  }

  public getSubCategories(level='level1',id='')
  {
    this.productService.subCategories(level,id).subscribe((data: any)=>{
      console.log(data);
      if(data.status == 'success')
      {
        if(level=='level1')
        {
          this.categoriesList =  data.data
        }
        if(level=='level2')
        {
          this.subCategoriesList =  data.data
        }
        if(level=='level3')
        {
          this.subSubCategoriesList =  data.data
        }
        
      }
     
    }) 
  }
  public getAvailabilitySizes(id){
    this.productService.getProductSizes(id).subscribe((data: any)=>{
      if(data.status == 'success')
      {
        this.availabilitySizes= data.data
      }
    })
  }
  public getProductAreas(){
    this.productService.getProductAreas().subscribe((data: any)=>{
      console.log(data);
      if(data.status == 'success')
      {
        this.productAreas =  data.data
      }
     
    }) 
  }
  onCheckboxChange(e) {

  }      
  
  
}
                                                                                                                                                                                                                                      
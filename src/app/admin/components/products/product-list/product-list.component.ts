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
  selectedType:any=1
  selectedLevel2:any={}
  selectedLevel3:any={}
  selectedArea:any={}
  selectedSize:any={}
  selectedColor:any={}
  selectedSortType:any
  loading:boolean = true
  constructor(private productService: ProductsService,private adminService: AdminService) { }
  sortOptions=[
    {
      id:"popular",
      name:"Popularity"
    },
    {
      id:"price_desc",
      name:"Price -- Low to Hight"
    },
    {
      id:"price_asc",
      name:"Price -- High to Low"
    },
    {
      id:"newest",
      name:"Newest First"
    }
  ]
  ngOnInit(): void {
    this.getProfileInfo()
    this.categories()
    this.getProductAreas()
    
    
  }
  filterChanged(eve)
  {
    console.log(eve)
    this.selectedSortType = eve
    this.getAllProductList()
  }
  public getAllProductList()
  {
    this.loading = true
      const inputData :any= {
        "business_userId":this.profileInfo.id,
        "offset":"0",
        "limit":"100",
        "filters":{
          "cat_1":[this.selectedType],
          "cat_2":this.selectedLevel2.id?[this.selectedLevel2.id]:[],
          "cat_3":this.selectedLevel3.id?[this.selectedLevel3.id]:[],
          "sizes":this.selectedSize.id?[this.selectedSize.id]:[],
          "area":this.selectedArea.id?[this.selectedArea.id]:[],
          "colors":this.selectedColor.id?[this.selectedColor.id]:[],
        },
        "sorting":this.selectedSortType?this.selectedSortType: "price_asc"
      };
      this.productService.getAllProductList(inputData).subscribe((data: any)=>{
        //console.log('veeru',data)
        this.loading = false
        if(data.status == 'success')
        {
          this.productList =  data.data
        }
    })
  }
  public getProfileInfo()
  {
      this.adminService.getProfileInfo().subscribe((data: any)=>{
        this.loading = false
        if(data.status == 'success')
        {
          this.profileInfo =  data.data
          this.getSubCategories('level2',this.selectedType)
        }
    })
  }
  public categories(level='level1',id='')
  {
    this.productService.subCategories(level,id).subscribe((data: any)=>{
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
      if(data.status == 'success')
      {
        if(level=='level1')
        {
          this.categoriesList =  data.data
          this.subCategoriesList = []
          this.subSubCategoriesList = []
          this.availabilitySizes = []
        }
        if(level=='level2')
        {
          this.selectedType=id
          this.selectedLevel2 ={}
          this.selectedLevel3 ={}
          this.selectedSize={}
          this.selectedArea={}
          this.subCategoriesList =  data.data
          this.subSubCategoriesList = []
          this.availabilitySizes = []
        }
        if(level=='level3')
        {
          this.subSubCategoriesList =  data.data
          this.availabilitySizes = []
        }
        
      }
      this.getAllProductList()
     
    }) 
   

  }
  public getAvailabilitySizes(id){
    this.getAllProductList()
    this.productService.getProductSizes(id).subscribe((data: any)=>{
      if(data.status == 'success')
      {
        this.availabilitySizes= data.data
      }
    })
  }
  public getProductAreas(){
    this.productService.getProductAreas().subscribe((data: any)=>{
      if(data.status == 'success')
      {
        this.productAreas =  data.data
      }
     
    }) 
  }
  onCheckboxChange(e,type='',selectedValue="") {
    if(type=='level2')
    {
      this.selectedLevel2 = selectedValue
    }
    if(type=='level3')
    {
      this.selectedLevel3 = selectedValue
    }
    if(type=='size')
    {
      this.selectedSize = selectedValue
    }
    if(type=='area')
    {
      this.selectedArea=selectedValue
      this.getAllProductList()
    }

  }      
  
  
}
                                                                                                                                                                                                                                      
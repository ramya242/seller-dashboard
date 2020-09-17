import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../products.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  categoriesList:any =[]
  subCategoriesList:any = []
  subSubCategoriesList:any =[]
  productAreas:any =[]
  whereToBuyList:any =[]
  availabilitySizes:any =[]
  unionTerritoriesList:any =[]
  productBoostList:any =[]
  productForm: FormGroup
  urls = [
    {
      id:1,
      url:'',
      file:''
    }
  ]
  constructor(private productService: ProductsService,
    private formBuilder: FormBuilder
    ) { 

      this.productForm = this.formBuilder.group({
        product_level1_category: ['', Validators.required],
        product_level2_category: ['', Validators.required],
        product_level3_category: ['', Validators.required],
        product_areas: [''],
        product_sizes: [''],
        actual_price: [''],
        offer_price: [''],
        exchange_days: [''],
        left_pieces: [''],
        where_to_buy: [''],
        title: [''],
        description:[''],
        product_boost:[''],
        union_territories:[''],
        subject_line:[]
       
      })
    }

  ngOnInit(): void {
    this.getSubCategories()
    this.getProductAreas()
    this.whereToBuy()
    this.unionTerritories()
    this.productBoost()
  }
  public unionTerritories(){
    this.productService.subCategories('','','product_union_territories').subscribe((data: any)=>{
      console.log(data);
      if(data.status == 'success')
      {
        this.unionTerritoriesList =  data.data
      }
     
    }) 
  }
  public productBoost(){
    this.productService.subCategories('','','product_boost').subscribe((data: any)=>{
      console.log(data);
      if(data.status == 'success')
      {
        this.productBoostList =  data.data
      }
     
    }) 
  }
  public getCategories(){
    this.productService.getCategories().subscribe((data: any)=>{
      console.log(data);
      if(data.status == 'success')
      {
        this.categoriesList =  data.data[0].category
      }
     
    }) 
  }
  public whereToBuy(){
    this.productService.whereToBuy().subscribe((data: any)=>{
      console.log(data);
      if(data.status == 'success')
      {
        this.whereToBuyList =  data.data
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

  public createProduct(){
   const product :any= {
      "title":"29 oct video thumbnail ratio",
      "description":"video",
      "product_level1_category":1,
      "product_level2_category":2,
      "product_level3_category":3,
      "product_areas":[1,2],
      "product_sizes":[1,2],
      "actual_price":"25",
      "offer_price":"10",
      "exchange_days":15,
      "left_pieces":5,
      "where_to_buy":"1",
      "links":"www.example.com/123"
    }
    this.productService.createProduct(product).subscribe((data: any)=>{
        console.log(data)
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
  detectFiles(event,i) {
    // this.urls = [];
    let files:any = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          // this.urls.push(e.target.result);
          console.log(e.target.result)
          console.log(i)
          this.urls[i].url=e.target.result
          this.urls[i].file=file
          console.log(this.urls)

        }
        reader.readAsDataURL(file);
      }
    }
  }
  removeImg(i){
  this.urls.splice(i,1)
  }
  addImage(){
    this.urls.push({
      id:1,
      url:'',
      file:''
    })
  }
  onSubmit(){

  }
}

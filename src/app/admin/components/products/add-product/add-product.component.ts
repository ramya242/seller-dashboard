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
        product_areas: [[]],
        product_sizes: [[]],
        actual_price: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
        offer_price: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
        exchange_days: ['', [Validators.pattern("^[0-9]*$")]],
        left_pieces: ['', [Validators.pattern("^[0-9]*$")]],
        where_to_buy: ['',Validators.required],
        title: [''],
        description:['',[Validators.required, Validators.maxLength(1000)]],
        product_boost:[''],
        union_territories:[''],
        subject_line:['',[Validators.required,  Validators.maxLength(150)]],
       
      })
    }

  ngOnInit(): void {
    this.getSubCategories()
    this.getProductAreas()
    this.whereToBuy()
    this.unionTerritories()
    this.productBoost()
    // this.createProduct()
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
    "title":this.f.title.value,
    "description":this.f.description.value,
    "product_level1_category":this.f.product_level1_category.value,
    "product_level2_category": this.f.product_level2_category.value,
    "product_level3_category":this.f.product_level3_category.value,
    "product_areas": this.f.product_areas.value,
    "product_sizes": this.f.product_sizes.value ,
    "actual_price":this.f.actual_price.value,
    "offer_price": this.f.offer_price.value,
    "exchange_days":this.f.exchange_days.value,
    "left_pieces":this.f.left_pieces.value,
    "where_to_buy":this.f.where_to_buy.value,
    "links":"www.example.com/123",
    "subject_line":this.f.subject_line.value,
    "union_territories":this.f.union_territories.value,
    "product_boost":this.f.product_boost.value
  }
    this.productService.createProduct(product).subscribe((data: any)=>{
        console.log(data)
        if(this.urls.length >0)
        {
          this.productFileUpload(data.productId)
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
  get f(){
    return this.productForm.controls;
  }

  productFileUpload(id){
    const formData = new FormData();  

    let files:any = this.urls.map((url,i)=>{
      if(i==0)
      {
        formData.append('thumbnail', url.file);  
      }
      formData.append('filesArray[]',url.file)
    });
    formData.append('type', 'image');  
    formData.append('productId', id);  
    this.productService.uploadProductFiles(formData).subscribe((data: any)=>{
      console.log(data)
  })    
  }
}

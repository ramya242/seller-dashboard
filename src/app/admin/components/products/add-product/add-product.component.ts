import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../products.service'
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import { X_OK } from 'constants';

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
  productColorsList:any=[]
  productForm: FormGroup
  productDetailForm: FormGroup
  productId:any
  commonId:any
  submitnewbutton: any
  apiresponse: any
  selectCategory: any 
  delivery_available : any = 0
  urlIndex:any =0
  urls = [
    {
      id:1,
      url:'',
      file:''
    }
  ]
  submitted:boolean=false;
  loading:any = false
  selectedVarientIndexForImages:any=0
  selectedVarientIndexForSizes:any=0
  variantImages:any =[]
  sizesWithLeftPieces:any =[]
  productSizeQuantiesArray:any=[]
  constructor(private productService: ProductsService,
    private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,private toastr: ToastrService,private router: Router,private modalService: NgbModal
    ) { 
      this.productForm = this.formBuilder.group({
        product_level1_category: ['', Validators.required],
        product_level2_category: ['', Validators.required],
        product_level3_category: ['', Validators.required],
        product_areas: [[]],
        product_sizes: [[]],
        // actual_price: ['', [Validators.required,Validators.pattern("^[0-9.]*$")]],
        // offer_price: ['', [Validators.required,Validators.pattern("^[0-9.]*$")]],
        exchange_days: ['', [Validators.pattern("^.[0-9]*$")]],
        // left_pieces: ['', [Validators.pattern("^[0-9]*$")]],
        where_to_buy: ['',Validators.required],
        title: ['',[Validators.required, Validators.maxLength(150)]],
        brand_name: ['',[Validators.required, Validators.maxLength(50)]],
        product_code:[''],
        search_keywords: [[],Validators.required],
        description:['',[Validators.required, Validators.maxLength(3000)]],
        product_boost:[''],
        union_territories:[''],
        subject_line:['',[Validators.required,  Validators.maxLength(350)]],
        links:[''],
        delivery_available:[0],
        variants: this.formBuilder.array([]) ,

       
      })
      this.productDetailForm = this.formBuilder.group({
        sizesLeftPieces: this.formBuilder.array([]) ,

      })
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id) {
          this.productId=params.id;
          this.commonId = params.commonId;
          this.productDetails()
        }
      })
    }

  ngOnInit(): void {
    this.getSubCategories()
    this.getProductAreas()
    this.whereToBuy()
    this.unionTerritories()
    this.productBoost()
    this.productColors()
    this.addVariant()
    // this.createProduct()
   
  }

  
  public unionTerritories(){
    this.productService.subCategories('','','product_union_territories').subscribe((data: any)=>{
      if(data.status == 'success')
      {
        this.unionTerritoriesList =  data.data
      }
     
    }) 
  }
  public productBoost(){
    this.productService.subCategories('','','product_boost').subscribe((data: any)=>{
      if(data.status == 'success')
      {
        this.productBoostList =  data.data
      }
     
    }) 
  }
  public productColors(){
    this.productService.subCategories('','','product_colors').subscribe((data: any)=>{
      if(data.status == 'success')
      {
        this.productColorsList =  data.data
      }
     
    }) 
  }
  public getCategories(){
    this.productService.getCategories().subscribe((data: any)=>{
      if(data.status == 'success')
      {
        this.categoriesList =  data.data[0].category
      }
     
    }) 
  }
  public whereToBuy(){
    this.productService.whereToBuy().subscribe((data: any)=>{
      if(data.status == 'success')
      {
        this.whereToBuyList =  data.data
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
  public getSubCategories(level='level1',id='')
  {
    this.productService.subCategories(level,id).subscribe((data: any)=>{
      if(data.status == 'success')
      {
        if(level=='level1')
        {
          this.categoriesList =  data.data
          // this.productForm.patchValue({
          //   product_level2_category:0,
          //   product_level3_category:0,
          // })
        }
        if(level=='level2')
        {
          this.subCategoriesList =  data.data
          // this.productForm.patchValue({
          //   product_level2_category:0,
          //   product_level3_category:0
          // })
        }
        if(level=='level3')
        {
          this.subSubCategoriesList =  data.data
        }
        
      }
     
    }) 
  }

  public createProduct(){
    this.submitted = true;
    let variants:any = this.f.variants.value.map((item,i)=>{
        item.sizes_with_left_pieces = this.sizesWithLeftPieces[i]
        return item
    })
    // return;
    // stop here if form is invalid

  for (let el in this.productForm.controls) {
    if (this.productForm.controls[el].errors) {
      // console.log([el])
      // console.log(this.productForm.controls[el].errors)
    }
  } 
  for (let el in this.productDetailForm.controls) {
    if (this.productDetailForm.controls[el].errors) {
      console.log([el])
      console.log(this.productDetailForm.controls[el].errors)
    }
  } 
 
 

 

     if (this.productForm.invalid) {
      this.toastr.info('Please enter all required fields.');
            return;
        }

        // alert()
        // return
    this.loading =true
   const product :any= {
    "title":this.f.title.value,
    "description":this.f.description.value,
    "product_level1_category":this.f.product_level1_category.value,
    "product_level2_category": this.f.product_level2_category.value,
    "product_level3_category":this.f.product_level3_category.value,
    // "product_areas": this.f.product_areas.value,
    // "product_sizes": this.f.product_sizes.value ,
    // "actual_price":this.f.actual_price.value,
    // "offer_price": this.f.offer_price.value,
    "exchange_days":this.f.exchange_days.value,
    // "left_pieces":this.f.left_pieces.value,
    "where_to_buy":this.f.where_to_buy.value,
    "links":this.f.links.value,
    "subject_line":this.f.subject_line.value,
    // "union_territories":this.f.union_territories.value,
    // "product_boost":this.f.product_boost.value,
    "delivery_available": this.delivery_available,
    "brand_name":this.f.brand_name.value,
    "product_code":this.f.product_code.value,
    "search_keywords":this.f.search_keywords.value,
    "variants":this.f.variants.value,

    
  }

  // return;
  if(this.productId)
  {
    product.productId = this.productId
    this.loading = true;
    this.productService.updateProduct(product).subscribe((data: any)=>{
        this.loading = false
          if(data.status == 'success')
          {
            this.toastr.info('Product updated successfully.');
            
          this.productFileUpload(data.data.productIds)
     
            this.router.navigate(['/admin/product-list'])
          }
          else{
            this.toastr.error('Unable to add product.');
          } 
        // }
       
             
    })
  }
 
  else{
    this.loading = true;
    this.productService.createProduct(product).subscribe((data: any)=>{
      this.loading = false
      this.productFileUpload(data.data.productIds)
    })
  }
    
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
          this.variantImages[this.selectedVarientIndexForImages][i].url=e.target.result
          this.variantImages[this.selectedVarientIndexForImages][i].file=file

        }
        reader.readAsDataURL(file);
      }
    }
  }
  removeImg(i,imageId){
    // alert(imageId)
    if(imageId && imageId!='')
    {
      if(confirm('Are you sure do you want to delete this image ?'))
      {
        this.deleteVariantImage(imageId)
      }
      else{
        return false
      }
     
    }
    this.variantImages[this.selectedVarientIndexForImages].splice(i,1)

  }
  addImage(trigger=false){
    // this.urls.push({
    //   id:1,
    //   url:'',
    //   file:''
    // })

    this.variantImages[this.selectedVarientIndexForImages].push({
      imageId:1,
      url:'',
      file:''
    })
    let imageId = this.variantImages[this.selectedVarientIndexForImages].length -1
    // console.log(imageId)
    setTimeout(()=>{
      if(trigger){
        let element: HTMLElement = document.getElementById('imageId'+imageId) as HTMLElement;
        element.click();
      }
    },10)
    
  }
  
  onSubmit(){
   
  }
  get f(){
    return this.productForm.controls;
  }

  productFileUpload(ids){
    // console.log(this.variantImages)
    // return
    ids.forEach((id,j) => {
      const formData   = new FormData();  
      if(this.variantImages[j] && this.variantImages[j].length ==0)
      {
        return false
      }
      let files:any = this.variantImages[j].map((url,i)=>{
      if(!url.file || url.file==''){
        return false
      }
      if(i==0)
      {
        formData.append('thumbnail', url.file);  
      }
      formData.append('filesArray[]',url.file)
    });


    if(!formData.has("filesArray[]"))
    {
      return false
    }
    formData.append('type', 'image');  
    formData.append('productId', id); 
    this.loading = true;
    this.productService.uploadProductFiles(formData).subscribe((data: any)=>{
      this.loading = false;
        if(data.status == 'success')
        {
          if(this.submitnewbutton)
          {
            this.submitnewbutton = 0;
            this.urls = [];
            this.f.title.reset();
            this.toastr.info('Product saved successfully.');
          }
          else{
            this.toastr.info('Product saved successfully.');
            this.router.navigate(['/admin/product-list'])
          }
        
        }
        else{
          this.toastr.error('Unable to add product.');
        }
      })   
    });
       
  }
  public productDetails()
  {
    const inputData :any= {"productId":this.productId,"commonId":this.commonId};
    this.loading = true;
    this.productService.sameTypeProductDetails(inputData).subscribe((data: any)=>{
      this.loading = false;
      if(data.status == 'success')
      {
        // return
        let product = data.data
        let {left_pieces, title, description,product_areas,offer_price,subject_line,actual_price,exchange_days,product_level1_category, product_level2_category, product_level3_category,product_sizes,product_boost,union_territories,where_to_buy,links,product_code,search_keywords,brand_name,product_variants,delivery_available  } = product
        product_sizes = Array.isArray(product_sizes) ?product_sizes.map(size => size.id) : []
        product_areas = product_areas ? product_areas.map(area => area.id) : []
        // where_to_buy = where_to_buy.map(type => area.id)
        this.delivery_available =delivery_available
        this.productForm.patchValue({
          left_pieces:left_pieces,
          title:title,
          description: description,
          offer_price:offer_price,
          subject_line:subject_line,
          actual_price:actual_price,
          exchange_days:exchange_days,
          product_level1_category:product_level1_category.id,
          product_level2_category:product_level2_category.id,
          product_level3_category:product_level3_category?product_level3_category.id:0,
          product_sizes: product_sizes,
          union_territories: union_territories,
          where_to_buy:where_to_buy != null?where_to_buy.id:0,
          product_boost:product_boost,
          product_areas:product_areas,
          links:links,
          product_code:product_code,
          search_keywords:search_keywords,
          brand_name:brand_name
          // participants: selectedContacts,
          // speakers:selectedSpeakers,
        })
        // this.selectCategory = 8;
        this.getSubCategories('level2',product_level1_category.id)
        this.getSubCategories('level3',product_level2_category.id)
        this.getAvailabilitySizes(product_level3_category?product_level3_category.id:0)
        this.variants().removeAt(0)
        this.variantImages =[]
        product_variants.forEach((item,k)=>{
          item.product_colors = item.product_colors ? item.product_colors.map(color => color.id) : []
          this.variants().push(this.formBuilder.group({
            actual_price:item.actual_price,
            offer_price:item.offer_price,
            offer_percentage:item.offer_percentage,
            is_stock_available:item.is_stock_available,
             product_colors:[item.product_colors],
             variant_id:item.id
          }))
          this.productSizeQuantiesArray.push(item.sizes_with_quantity)
          this.variantImages.push(item.variant_media)
       
        
            // const control = <FormArray>this.variants().at(k).get('product_colors');
            
            //   control.push(this.formBuilder.group(item.product_colors)    )
          
          // this.variants()
          //     .at(k)
          //     .patchValue({ product_colors: item.product_colors })
          // this.getData('emails').push(
          //   this.formBuilder.group({
          //     value: [item.value, [Validators.required, Validators.email]],
          //     format: [item.format],
          //     title: [item.title],
          //     key: ['']
          //   })
          // )
        })
      }
  })
  }
  getCategoryName(type)
  {
    if(type=='level1')
    {
      return this.categoriesList.filter(item => item.id== this.f.product_level1_category.value).map(e=>e.name)
    }
    if(type=='level2')
    {
      return this.subCategoriesList.filter(item => item.id== this.f.product_level2_category.value).map(e=>e.name)
    }
    if(type=='level3')
    {
      return this.subSubCategoriesList.filter(item => item.id== this.f.product_level3_category.value).map(e=>e.name)
    }
   
  }
  submitnew()
  {
    this.submitnewbutton = 1;
  }
  checkValue(values:any){
    this.delivery_available = values.currentTarget.checked?1:0;
  }
  variants() : FormArray {
    return this.productForm.get("variants") as FormArray
  }
   
  newVariant(): FormGroup {
    return this.formBuilder.group({
      product_colors:  [],
      // sizes_with_left_pieces: [],
      actual_price:'',
      offer_price:'',
      offer_percentage:'',
      is_stock_available:'',
      variant_id:''
    })
  }
   
  addVariant() {
    this.variants().push(this.newVariant());
    this.variantImages.push([])
  }
   
  removeVariant(i:number) {
    if(this.variants().at(i).value.variant_id && this.variants().at(i).value.variant_id!='')
    {
      if(confirm('Are you sure do you want to delete this variant ?'))
      {
        this.deleteVariant(this.variants().at(i).value.variant_id)
      }
      else{
        return false
      }
     
    }
   
    this.variants().removeAt(i);
    this.variantImages.splice(i,1)

  }


  sizesLeftPieces() : FormArray {
    return this.productDetailForm.get("sizesLeftPieces") as FormArray
  }
   
  newSizesLeftPieces(): FormGroup {
    return this.formBuilder.group({
      size_id:0,
     left_pieces:0
    })
  }
   
  addSizesLeftPieces() {
    this.sizesLeftPieces().push(this.newSizesLeftPieces());
    // this.sizesWithLeftPieces[this.selectedVarientIndexForImages].push([])
  }
   
  removeSizesLeftPieces(i:number) {
    this.sizesLeftPieces().removeAt(i);
    // this.sizesWithLeftPieces[this.selectedVarientIndexForImages].splice(i,1)
  }

  open(content) {
    if(this.productSizeQuantiesArray[this.selectedVarientIndexForSizes])
    {
      let pDetails = this.productSizeQuantiesArray[this.selectedVarientIndexForSizes]
      this.sizesLeftPieces().clear()
      if(pDetails.length >0){
        pDetails.forEach((details,l) => {
          this.sizesLeftPieces().push(this.formBuilder.group({
            size_id: details.size_id,
            left_pieces: details.left_pieces
          }))
        });
      }
      else{
        this.addSizesLeftPieces()
      }
    }
    else{
      (this.productDetailForm.controls['sizesLeftPieces'] as FormArray).clear();

      // this.sizesLeftPieces()= this.newSizesLeftPieces();
      this.addSizesLeftPieces()
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  get g(){
    return this.productDetailForm.controls;
  }
  saveProductDetails(){
    this.sizesWithLeftPieces[this.selectedVarientIndexForSizes] = []
    this.productSizeQuantiesArray[this.selectedVarientIndexForSizes] = []
    this.sizesWithLeftPieces[this.selectedVarientIndexForSizes] = this.g.sizesLeftPieces.value
    this.productSizeQuantiesArray[this.selectedVarientIndexForSizes]=this.g.sizesLeftPieces.value
  }
  addTag(tag: string) {
    /* https://github.com/ng-select/ng-select/issues/809 */
      return tag;
  }
  getColorCode(index,colorId){
    if(index==0 && colorId && colorId.length > 0)
    {
      return this.productColorsList.map(item=>{
        if(item.id==colorId[0]){
          return item.color_code_hex
        }
      }).filter(item=>item)
    }
    if(index==1 && colorId && colorId.length > 0)
    {
      let selectedId = colorId.length > 1 ? colorId[1] : colorId[0]
      return this.productColorsList.map(item=>{
        if(item.id == selectedId){
          return item.color_code_hex
        }
      }).filter(item=>item)
    }
    
  }
  getSizeName(id){
   
      return this.availabilitySizes.map(item=>{
        if(item.id==id){
          return item.name
        }
      }).filter(item=>item)
    
    
    
  }
  deleteVariant(variantId){
    this.loading = true;
    this.productService.deleteVariant(variantId).subscribe((data: any)=>{
      this.loading = false;
      if(data.status == 'success')
      {
        this.toastr.info('Variant deleted successfully.');
      }
     
    }) 
  }
  deleteVariantImage(variantId){
    this.loading = true;
    this.productService.deleteVariantImage(variantId).subscribe((data: any)=>{
      this.loading = false;
      if(data.status == 'success')
      {
        this.toastr.info('Image deleted successfully.');
      }
     
    }) 
  }
  showAlert()  {
    // alert()
    // alert(this.f.product_level3_category.value)
    if(!this.f.product_level3_category.value || this.f.product_level3_category.value ==0)
    {
      // alert("Please select gender or category or subcategory.")
    }
    
  }
  getPrice(i) {
    
    let percentage  = this.variants().at(i).value.offer_percentage
    let price  = this.variants().at(i).value.actual_price
    let offerVal = Number(percentage) / 100;
    var totalValue = price - (price * offerVal)
    this.variants().at(i).patchValue({
      offer_price:totalValue
    })
    return totalValue
    
  }
}

import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  headers:any= {}
  constructor(private httpClient: HttpClient) {
     this.headers = {'Authorization': this.getToken(), 'Content-Type': 'application/json'};
   }
  public getCategories(){
    return this.httpClient.get(`${environment.API_URL}business_profile/metadata`);
  }
  public getProductAreas(){
    return this.httpClient.get(`${environment.API_URL}business_profile/meta/product_areas`);
  }
  public whereToBuy(){
    return this.httpClient.get(`${environment.API_URL}business_profile/meta/where_to_buy`);
  }
  public deliveryServiceTypes(){
    return this.httpClient.get(`${environment.API_URL}business_profile/meta/delivery_service_types`);
  }
  public areaOfOperations(){
    return this.httpClient.get(`${environment.API_URL}business_profile/meta/area_of_operations`);
  }
  public subCategories(level,id,name=''){
    let url:any = ""
    if(name)
    {
      url = name
    }   
    if(level == "level1")
    {
      url=`product_categories/${level}`
    }
    if(level == "level2" || level == "level3" )
    {
      url=`product_categories/${level}/${id}`
    }

    return this.httpClient.get(`${environment.API_URL}business_profile/meta/${url}`);
  }

  public createProduct(product)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/products/create`,product,{headers:this.headers});
  }
  public getProductSizes(categoryId)
  {
    return this.httpClient.get(`${environment.API_URL}business_profile/meta/product_sizes/level3/${categoryId}`);
  }
  public getAllProductList(data)
  {
  
    return this.httpClient.post(`${environment.API_URL}business_profile/products/getAll`,data,{headers:this.headers});
  }
  public productDetails(productId)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/products/single`, productId,{headers:this.headers});
  }
  public uploadProductFiles(formData)
  {
    this.headers = {'Authorization':  this.getToken()};
    return this.httpClient.post(`${environment.API_URL}business_profile/products/fileUpload`, formData,{headers:this.headers});
  }
  getToken()
  {
    return "Bearer "+localStorage.getItem("jtoken")
  }
}

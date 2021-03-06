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
    return this.httpClient.post(`${environment.API_URL}business_profile/products/create`,product);
  }
  public updateProduct(product)
  {
    return this.httpClient.put(`${environment.API_URL}business_profile/products/update`,product);
  }
  public getProductSizes(categoryId)
  {
    return this.httpClient.get(`${environment.API_URL}business_profile/meta/product_sizes/level3/${categoryId}`);
  }
  public getAllProductList(data)
  {
  
    return this.httpClient.post(`${environment.API_URL}business_profile/products/getAll`,data);
  }
  public productDetails(productId)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/products/single`, productId);
  }
  public sameTypeProductDetails(productId)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/products/sameTypeProducts`, productId);
  }
  public uploadProductFiles(formData)
  {
    // this.headers = {'Authorization':  this.getToken()};
    return this.httpClient.post(`${environment.API_URL}business_profile/products/fileUpload`, formData);
  }
  public productDelete(productId)
  {
    // this.headers = {'Authorization':  this.getToken()};
    return this.httpClient.delete(`${environment.API_URL}business_profile/products/delete/${productId}`);
  }
  public deleteVariant(variantId)
  {
    return this.httpClient.delete(`${environment.API_URL}business_profile/products/deleteVariant/${variantId}`);
  }
  public deleteVariantImage(variantId)
  {
    return this.httpClient.delete(`${environment.API_URL}business_profile/products/deleteVariantImage/${variantId}`);
  }
  getToken()
  {
    return "Bearer "+localStorage.getItem("jtoken")
  }
  public deleteMultiProducts(ids)
  {
    return this.httpClient.delete(`${environment.API_URL}business_profile/products/deleteMulti/${ids}`);
  }
  public stockUpdate(input)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/products/stockUpdate`,input);
  }
}

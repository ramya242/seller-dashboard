import { Injectable } from '@angular/core';
import { environment} from '../../../../environments/environment'

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpClient: HttpClient) {}

  public getOfferCategories(){
    return this.httpClient.get(`${environment.API_URL}business_profile/meta/offer_categories`);
  }
  public offerDetails(offerId)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/offers/single`, offerId);
  }
  public uploadProductFiles(formData)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/offers/fileUpload`, formData);
  }
  public createOffer(offer)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/offers/create`,offer);
  }
  public updateOffer(offer)
  {
    return this.httpClient.put(`${environment.API_URL}business_profile/offers/update`,offer);
  }
  public getOffers(data)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/offers/getAll`,data);
  }
  public offerDelete(id)
  {
    return this.httpClient.delete(`${environment.API_URL}business_profile/offers/delete/${id}`);
  }
  public multiOffersDelete(ids)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/offers/deleteMulti`,ids);
  }
  public getTotalOffers(userId){
    return this.httpClient.get(`${environment.API_URL}business_profile/offers/count/${userId}`);
  }
}

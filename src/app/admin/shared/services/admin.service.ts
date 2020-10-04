import { Injectable } from '@angular/core';
import { environment} from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  headers:any= {}
  constructor(private httpClient: HttpClient) {
    this.headers = {'Authorization': this.getToken(), 'Content-Type': 'application/json'};
  }
  getToken()
  {
    return "Bearer "+localStorage.getItem("jtoken")
  }
  public getProfileInfo()
  {
    return this.httpClient.get(`${environment.API_URL}user/profile`,{headers:this.headers});
  }
}

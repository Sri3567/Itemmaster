import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configuration } from './config/configuration';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ItemmasterService {

  private APIUrl: string;

  dismissAll() {
    throw new Error('Method not implemented.');
  }
 
  constructor(private http:HttpClient,public lurl: configuration) { }

  // apiurl="http://localhost:8098/api/"

//  getall():Observable<any>{
//    return this.http.get("http://localhost:8098/api/orders")
//  }
async getall(): Promise<any>{
  let url = "http://localhost:8098/api/orders";
  const response = await this.http.get(url).toPromise();
  return response;
}

async getalldata(): Promise<any>{
  let url = "http://localhost:8098/api/order";
  const response = await this.http.get(url).toPromise();
  return response;
}
//  createdata(data:any){
//   return this.http.post("http://localhost:8098/api/orders",data)
//  }
async createdata(data:any):Promise<any>{
  this. APIUrl =this.lurl.APIUrl + 'orders';
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  let options = {
    headers: headers,
  };
  const response = await this.http.post(this.APIUrl,data,options).toPromise()
    return response;
  }

//  updatedata(data:any){
//   return this.http.post("http://localhost:8098/api/update",data)
//  }

 async updatedata(data:any):Promise<any>{
  this. APIUrl =this.lurl.APIUrl + 'update';
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  let options = {
    headers: headers,
  };
  const response = await this.http.post(this.APIUrl,data,options).toPromise()
    return response;
  }
//  voiditem(data:any):Observable<any>{
//   return this.http.post("http://localhost:8098/api/delete",data)

//  }
async voiditem(data:any):Promise<any>{
  this. APIUrl =this.lurl.APIUrl + 'delete';
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  let options = {
    headers: headers,
  };
  const response = await this.http.post(this.APIUrl,data,options).toPromise()
    return response;
  }


//  getitem(desc:any):Observable<any>{
//   return this.http.get(`http://localhost:8098/api/orderss?itemdescription=}`);
//  }
 async getitem(id:any):Promise<any>{
  let APIUrl = this.lurl.APIUrl + 'orderss?itemdescription=' + id;
  const response = await this.http.get(APIUrl).toPromise()
  return response;
} 
//  getuomid(desc:any):Observable<any>{
//   return this.http.get(`http://localhost:8098/api/uom/${desc}`);
//  }
async getsuom():Promise<any>{
  let url = "http://localhost:8098/api/uom";
  const response = await this.http.get(url).toPromise();
  return response;
}

// createuom(data:any){
//   return this.http.post("http://localhost:8098/api/uoms",data)
//  }
async createuom(data:any):Promise<any>{
this. APIUrl =this.lurl.APIUrl + 'uoms';
let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});
let options = {
  headers: headers,
};
const response = await this.http.post(this.APIUrl,data,options).toPromise()
  return response;
}

 async getpos():Promise<any>{
  let url = "http://localhost:8098/api/pos";
  const response = await this.http.get(url).toPromise();
  return response;
}

// createpos(data:any){
//   return this.http.post("http://localhost:8098/api/poss",data)
//  }

 async createpos(data:any):Promise<any>{
  this. APIUrl =this.lurl.APIUrl + 'poss';
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  let options = {
    headers: headers,
  };
  const response = await this.http.post(this.APIUrl,data,options).toPromise()
    return response;
  }

//  getism():Observable<any>{
//   return this.http.get("http://localhost:8098/api/ism")

// }

// createism(data:any){
//   return this.http.post("http://localhost:8098/api/isms",data)
//  }
//  updateism(data:any){
//   return this.http.post("http://localhost:8098/api/updateism",data)
//  }









}

function tap(arg0: (data: any) => void): import("rxjs").OperatorFunction<Object, any> {
  throw new Error('Function not implemented.');
}

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showsucess(message:any,title:any){
    this.toastr.success(title,message,)
  }
  showwarning(message:any,title:any){
    this.toastr.warning(message,title)
  }
 showerror(message:any,title:any){
    this.toastr.error(message,title)
 }

}
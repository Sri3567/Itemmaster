import { Component, Injectable, OnInit } from '@angular/core';
import { uommastermodel } from '../model/uommastermodel';
import { ItemmasterService } from '../itemmaster.service';
import { Inject } from '@angular/core';

import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../tostar.service';

@Component({
  selector: 'app-uom-master',
  templateUrl: './uom-master.component.html',
  styleUrls: ['./uom-master.component.scss']
})
export class UomMasterComponent implements OnInit {

  model:uommastermodel;
  isupdate = false;

  constructor(private service:ItemmasterService,private dilogRef:MatDialogRef<uommastermodel>,
    @Inject(MAT_DIALOG_DATA)public data:any, private toaster:ToastService) { 
      dilogRef.disableClose = true;
    }

  ngOnInit(): void {
    this.model = new uommastermodel()
  }

  // onbluritemrate(event:any){
  //   if(event.target.value < 0 || event.target.value>=10000000){
  //     this.model.uomcode =  '';
  //   }
  // // }  
  // onClose() {
  //   let fname = sessionStorage.getItem('FormMdata');
  //   if (fname == 'UOM') {
  //     this.getuomcode();
  //   }
  //   this.service.dismissAll();
  //   sessionStorage.clear();
  // }
  formvalidation(){
    if( this.model.UOMCode == "" ||this.model.UOMCode == undefined || this.model.UOMCode == null  ){
      this.toaster.showwarning('Item Rate cannot be blank,and not special charecter',"ITEM MASTER")
      return false
    }
    if( this.model.UOMDesc == "" ||this.model.UOMDesc == undefined || this.model.UOMDesc == null ){
      this.toaster.showwarning('Item Tax cannot be blank,and not special charecter',"ITEM MASTER")
      return false
    }
    return true
  }


  preparemodel(){
    let mod = new uommastermodel();
    mod.UOMCode = this.model.UOMCode;
    mod.UOMDesc = this.model.UOMDesc;
    mod.createdAt = this.model.createdAt;
    mod.updatedAt = this.model.updatedAt;
    mod.voidAt = this.model.voidAt;
    mod.Void = "N";
    return mod;
  }

 async  onSubmit(){
    if(this.formvalidation()== true){
    //  this.model.Void = "N"
     if(this.isupdate == false){
      const PrepareMode= this.preparemodel();
      let response = await this.service.createuom(PrepareMode).catch(err=>{
        console.log(err.message)
        
      })
      if (response.Boolval == true){
      this.toaster.showsucess(' Record Added Successfully',"ITEM MASTER")
      this.model = new uommastermodel();
      this.dilogRef.close();
      }
      else{
        this.toaster.showwarning(response.returnerror,"POS MASTER")
      }
     }
    
    }
}

}

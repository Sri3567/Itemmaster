import { Component, OnInit } from '@angular/core';
import { posmastermodel } from '../model/posmastermodel';
import { ItemmasterService } from '../itemmaster.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../tostar.service';

@Component({
  selector: 'app-pos-master',
  templateUrl: './pos-master.component.html',
  styleUrls: ['./pos-master.component.scss']
})
export class PosMasterComponent implements OnInit {

  model:posmastermodel;
  isupdate = false;
  isBoolean = false;
  response: any;
  

  constructor(private service:ItemmasterService,private dilogRef:MatDialogRef<posmastermodel>,private toaster:ToastService) { }

  ngOnInit(): void {
    this.model = new posmastermodel()
  }


  formvalidation(){
    if( this.model.poscode == "" ||this.model.poscode == undefined || this.model.posdesc == null  || this.model.posdesc.trim() =="" ){
      this.toaster.showwarning('POS CODE cannot be blank',"ITEM MASTER")
      return false
    }
    if( this.model.posdesc == "" ||this.model.posdesc == undefined || this.model.posdesc == null || this.model.posdesc.trim() =="" ){
      this.toaster.showwarning('POS DESC cannot be blank',"ITEM MASTER")
      return false
    }
    return true
  }

  
  preparemodel(){
    let mod = new posmastermodel();
    mod.poscode = this.model.poscode;
    mod.posdesc = this.model.posdesc;
    mod.createdAt = this.model.createdAt;
    mod.updatedAt = this.model.updatedAt;
    mod.voidAt = this.model.voidAt;
    mod.void = "N";
    return mod;
  }
  async onSubmit(){
    if(this.formvalidation()== true){
    //  this.model.Void = "N"
     if(this.isupdate == false){
      const PrepareMode= this.preparemodel();
      let response = await this.service.createpos(PrepareMode).catch(err=>{
        console.log(err.message)
        
      })
      if(response.Boolval == true){
        this.toaster.showsucess('Record Added Successfully',"POS MASTER")
      this.model = new posmastermodel();
      this.dilogRef.close();
     
      }
      else{
        this.toaster.showwarning(response.returnerror,"POS MASTER")
      }
     
      }
     
     }
     
     
    
    }
}




import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxPercentage } from '../model/taxmodel';
import { ToastService } from '../tostar.service';
import { itemmastermodel } from '../model/itemmastermodel';
import { posmastermodel } from '../model/posmastermodel';


@Component({
  selector: 'app-taxdetails',
  templateUrl: './taxdetails.component.html',
  styleUrls: ['./taxdetails.component.scss']
})
export class TaxdetailsComponent implements OnInit {
  
  percentage:any;
  modle:TaxPercentage;
  model:itemmastermodel;
  models: posmastermodel;
 

  taxes: TaxPercentage [] = [];
  constructor(
    public dialogRef: MatDialogRef<TaxdetailsComponent>,private toaster:ToastService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}
  ngOnInit(): void {
    
  }
 formvalidation(){
   if(this.percentage == "" || this.percentage == null || this.percentage == undefined){
      this.toaster.showwarning("Percentage cannot be blank","")
      return false
    }
    return true

 }
 

  onAddClick(): void {
    if(this.formvalidation() != true){
      if(this.percentage == null){
        // this.toaster.showerror("Percentage cannot be blank","")
      }
    }else{
     this.dialogRef.close(this.percentage);
     
    }
   
    
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
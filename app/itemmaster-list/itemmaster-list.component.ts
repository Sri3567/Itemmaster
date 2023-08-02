import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemmasterService } from '../itemmaster.service';
import { ToastService } from '../tostar.service';
import { configuration } from '../config/configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ButtonModel, itemmastermodel } from '../model/itemmastermodel';
import { MultiArrModel } from '../model/multiarray';

@Component({
  selector: 'app-itemmaster-list',
  templateUrl: './itemmaster-list.component.html',
  styleUrls: ['./itemmaster-list.component.scss']
})
export class ItemmasterListComponent implements OnInit {

  isEditing: boolean = false;

  displayedColumns = ['itemdescription', 'uom', 'tax', 'creationdate', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  model: itemmastermodel;
  _buttonModel: ButtonModel;
  MultiArr: MultiArrModel[];



  dataSource: any;
  loaddata: [];
  _dataListLength: any;
  dataload : any;
  isupdate = false;
  IsVoid = false;
  response: any;
  void: any;
row: any;
// Void :'N'

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }


  constructor( private route: ActivatedRoute,
    private router: Router,
    private service: ItemmasterService,
    private toaster: ToastService ,
    public config: configuration
    
    ) { 
   
  }

  ngOnInit(): void {

    this.loadlist();
    this.model = new itemmastermodel();

   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
async loadlist(){
  let response = await this.service.getall().catch(err => {

        console.log(err)
      })
      
      console.log(response)
      this.dataload = response.data;
      

      this.dataSource =new MatTableDataSource(this.dataload);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this._dataListLength = response.lenght;
      // this.dataSource.paginator.length = response.length
}
// async ExportExcel(){
//   let response = await this.service.getall().catch(err=>{
//     console.log(err)
//   });
//   console.log(response.data)
//   if (response != undefined) {
//     let array = JSON.parse(JSON.stringify(response.data.map(({itemdescription  }) => ({itemdescription }))));

//     this.config.exportArrayToExcel(array, "item master", "sheet1");
  
//     return;
//   }
 
//   return;
// }
async AllExportExcel(){
  let response = await this.service.getall().catch(err=>{
    console.log(err)
  });
  let response1 = await this.service.getalldata().catch(err=>{
    console.log(err)
  });
  console.log(response)
  if (response != undefined) {
   
    this.MultiArr = [];

    let obj = {
      data : JSON.parse(JSON.stringify(response.data.map(({itemdescription,Uom,itemtax,creationdate,Void }) => ({itemdescription,Uom,itemtax,creationdate,Void })))),
      sheet:  "sheet1"
    }
    let obj2 = {
      data : JSON.parse(JSON.stringify(response1.data.map(({itemdescription,poscode,rate }) => ({itemdescription,poscode,rate  })))),
      sheet: "sheet2"
    }
    this.MultiArr.push(obj);
    this.MultiArr.push(obj2);

  
    this.config.exportMultiArrayToExcel(this.MultiArr, "Item Master");

  }
 
  return;
}

  // async loadlist() {

  //   let response = await this.service.getall().catch(err => {

  //     console.log(err)
  //   })
  //   let response1 = await this.service.getalldata().catch(err => {

  //     console.log(err)
  //   })
  //   // console.log(response);
  //   // console.log(response1);
  //   // this.loaddata =set (response.data + response1.data)
  //   const loaddata = response.data;
  //   const loaddata1 = response1.data;

  //   this.dataload = loaddata1.map((item1: any) => ({
  //     ...item1, ...loaddata.find((item2: { itemdescription: any; }) => item2.itemdescription === item1.itemdescription)
  //   }))
  //   // this.loaddata = (response.data).concat(response1.data);
  //   console.log(this.dataload);
  //   this.dataSource = new MatTableDataSource(this.dataload.reverse());

  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //   this._dataListLength = response.length;
  //   // this.dataSource.paginator.length = response.length;

  // }
 
  edit(data: any): void {
    console.log(data);
    this.router.navigate(['/itemedit', data.itemdescription], { relativeTo: this.route });
    
  }
  onCreate(): void {
    this.router.navigate(['/itemedit', '0'], { relativeTo: this.route });
  }
 
  
  

  async Void(data:any){
    const editedMod = new itemmastermodel();
    editedMod.itemdescription = data.itemdescription;
    editedMod.Void = 'Y';
    let response = await this.service.voiditem(editedMod).catch(err =>{
      console.log(err);
    })
    if(response != null){
      this.toaster.showsucess('voided successfully','ITEM MASTER')
    }
    this.refresh();
    
  }

 

  async UnVoid(data:any){
    const editedMod = new itemmastermodel();
    editedMod.itemdescription = data.itemdescription;
    editedMod.Void = 'N';
    let response = await this.service.voiditem(editedMod).catch(err =>{
      console.log(err);
    })
    if(response != null){
      this.toaster.showsucess('Unvoided successfully','ITEM MASTER')
    }
    this.refresh();
    
  }


  refresh(): void {
    window.location.reload();
  }

}

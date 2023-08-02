import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { POSItemGrid, itemmastermodel } from '../model/itemmastermodel';
import { ItemmasterService } from '../itemmaster.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UomMasterComponent } from '../uom-master/uom-master.component';
import { configuration } from '../config/configuration';
import { ToastService } from '../tostar.service';
import { posmastermodel } from '../model/posmastermodel';
import { PosMasterComponent } from '../pos-master/pos-master.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaxPercentage } from '../model/taxmodel';
import { TaxdetailsComponent } from '../taxdetails/taxdetails.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss']
})
export class ItemMasterComponent implements OnInit {

  [x: string]: any;

  isEditing: boolean = false;



  // options = ['10%', '12%', '18%', '24%'];
  selectedOption: string;
  tableHeaders: string[] = ['POS CODE', 'ACTIVE', 'RATE'];

  displayedColumns = ['itemdescription', 'uom', 'rate', 'poscode', 'tax', 'creationdate', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;




  model: itemmastermodel;
  models: posmastermodel;
  itemlist: any;

  
  param : any;
  createdate: any;
  _lable: string = "SUBMIT";
  isupdate = false;
  IsVoid = false;
  UOMCode:any;
  // selectedUom: string;
  poscode: any;
  isDisabled = true;
  // percentage:any;

  POSItemGrid: any = [];
  _itemmaster: POSItemGrid[];
  _Model: POSItemGrid;
  dataSource: any;
  loaddata: [];
  _dataListLength: any;
  itemtaxt:any;
responsedata : any;


 percentage:boolean=true;


 @HostListener('document:click', ['$event'])
  onDcoumentClick(event: MouseEvent){
    
    if(this.taxes.length > 0){
      this.percentage=false;
      
    }
    else{
      this.percentage=true;
      this.toaster.showwarning("First  File the  Feed Tax","ITEM MASTER")
    }
  }
 
  obj: any = [];
  taxes: TaxPercentage[] = [];
  // taxPercentages: any[] = [];
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }


  uniquePosCodesCount: number = 0;

  pushValueToArray(itemtax: any) {
    this.taxes.push(itemtax);
  }



  constructor(private service: ItemmasterService,
    public datePipe: DatePipe, private matDialog: MatDialog, public config: configuration, private toaster: ToastService, private route: ActivatedRoute,
    private router: Router,) {
     
  }



  ngOnInit(): void {

    this.model = new itemmastermodel();
    this.models = new posmastermodel();
    this._Model = new POSItemGrid();
    this.modle = new TaxPercentage();
    this.getdata();
    this.getdatas();
    this.getuomcode();
    this.getposcode();
    this.currentdate = new Date();
    this.isupdate = false;
    // this.IsVoid = false;
    // this. UOMCode=[];
    // this.setDefaultUom();

    this.setDate();
    this.getposmodule();
    this.loadlist();

    this.param = this.route.snapshot.paramMap.get('itemdescription');
    if (this.param != "0") {
      this.edit(this.param);
    }

  }
  // setDefaultUom() {
  //   // Check if there's only one option in uomOptions
  //   if (this.UOMCode.length === 1) {
  //     this.selectedUom = this.UOMCode[0]; // Set the default value
  //   } else {
  //     // Set some default value if you want to display a default option when there are multiple options
  //     this.selectedUom = 'Select UomCode';
  //   }
  // }

  // onUomChange() {
  //   // Implement any logic here if you need to perform some actions when the selection changes
  //   console.log('Selected Uom:', this.selectedUom);
  // }

  async edit(row: any) {
    let item = this.param;

    let response = await this.service.getitem(item).catch(err => {
      this.toaster.showerror(err.message, "ITEM MASTER");
      this.model = new itemmastermodel();
      this._Model = new POSItemGrid();
    });

    this.model = response.data;
    this.itemtaxt = response.data.itemtax;
    const Taxes: TaxPercentage = {
      id: this.taxes.length + 1,
      percentage: this.itemtaxt,

    };
   
    this.taxes.push(Taxes);

    let cVal: any = this.datePipe.transform(response.data.creationdate, 'yyyy-MM-dd', "+0000");
    this.model.creationdate = cVal;
    this.responsedata = response.data2;
    this.isupdate = true;
    this.getposgrid();
    // for (let i = 0; i < this.POSItemGrid.length; i++) {
    //   // this.posmos[i].posdesc = response[i].posdesc;
    //   this.POSItemGrid[i].showoff = true;
    // }
    if (this.model.Void != null) {
      this.model.Void == 'N' ? this.IsVoid = false : this.IsVoid = true;
    }
  }

  async loadlist() {

    let response = await this.service.getall().catch(err => {

      console.log(err)
    })
    let response1 = await this.service.getalldata().catch(err => {

      console.log(err)
    })
    // console.log(response);
    // console.log(response1);
    // this.loaddata =set (response.data + response1.data)
    const loaddata = response.data;
    const loaddata1 = response1.data;

    this.dataload = loaddata1.map((item1: any) => ({
      ...item1, ...loaddata.find((item2: { itemdescription: any; }) => item2.itemdescription === item1.itemdescription)
    }))
    // this.loaddata = (response.data).concat(response1.data);
    console.log(this.dataload);
    this.dataSource = new MatTableDataSource(this.dataload.reverse());

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._dataListLength = response.length;
    // this.dataSource.paginator.length = response.length;

  }



  setDate() {
    this.currentDate = new Date();
    this.MaxDate = JSON.parse(JSON.stringify(this.config.gGetDateyyyymmdd(this.currentDate)));
    this.model.creationdate = this.MaxDate;
  }

  openDialog() {
    if (this.model.Uom = "ADD UOM") {
      const dialogRef = this.matDialog.open(UomMasterComponent, { disableClose: true });

      dialogRef.afterClosed().subscribe({
        next: (val) => {
          this.getuomcode()
          // this.refresh();
          this.web.uom = ''


        }
      })
    }
  }

  openDialogs() {
    if (this.models.poscode = "ADD POS") {
      const dialogRef = this.matDialog.open(PosMasterComponent, { disableClose: true });

      dialogRef.afterClosed().subscribe({
        next: (val) => {
          this.getposmodule()
          
          this.models.poscode = ''

        }
      })
    }
  }

  

  //tax percentage
  openTax(): void {
    const dialogRef = this.matDialog.open(TaxdetailsComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: TaxPercentage) => {

      if (result) {
        const newTax: TaxPercentage = {
          id: this.taxes.length + 1,
          percentage: result,

        };
       
        console.log(result)
        let arr = this.taxes.find( e=> e.percentage == result)
        if(arr != null){
          this.toaster.showerror("Tax Percentage alredy exists","ITEM MASTER");
          return 
        }
        this.taxes.push(newTax);
       
      
        this.toaster.showsucess("Tax Percentage added Successfully Added","ITEM MASTER")
        
      }
     
      
    });
    
  }

  // submitTaxes(): void {

  //   this.taxes = [];
  // }
  // openAddTaxDialog() {
  //   const dialogRef = this.matDialog.open(TaxPercentage);

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     if (result) {
  //       this.taxPercentages.push(result);
  //     }
  //   });
  // }



  async getposmodule() {
    let response = await this.service.getpos().catch(err => {
      this.toaster.showerror(err.message, "ITEM MASTER");
    })

    this.POSItemGrid = response.data;
    this.getposgrid()
    this.uniquePosCodesCount = this.POSItemGrid.lenght;
    // if (this.POSItemGrid.length) { }
    // for (let i = 0; i < response.data.length; i++) {
    //   // this.POSItemGrid[i].poscode=response.data[i].poscode
    //   this.POSItemGrid[i].isChecked=false;
    //   this.POSItemGrid[i].showoff = true;
    // }


  }

async getposgrid(){
  this.model.POSItemGrid=[];
  for(let k=0;k<this.POSItemGrid.length; k++){
    this._itemModel = new POSItemGrid();
    this._itemModel.itemdesc = this.model.itemdescription;
    this._itemModel.poscode = this.POSItemGrid[k].poscode;
    this._itemModel.isChecked = false;
    this._itemModel.rate = 0;
    this._itemModel.disablerate = false;
    this.model.POSItemGrid.push(this._itemModel)

    for(let i=0; i<this.model.POSItemGrid.length;i++){
      for(let j=0;j<this.responsedata.length;j++){
        if(this.POSItemGrid[i].poscode == this.responsedata[j].poscode){
          this.model.POSItemGrid[i].poscode = this.responsedata[j].poscode;
          this.model.POSItemGrid[i].isChecked = true;
          this.model.POSItemGrid[i].rate = this.responsedata[j].rate;
          this.model.POSItemGrid[i].disablerate = false;
        }
      }
      this.isEditMode = !this.isEdutMode;
    }
  }
}

  isCheckedvoid(event: any, i: any) {
    if (this.POSItemGrid[i].isChecked == true) {
      this.POSItemGrid[i].showoff = false;
    }
    else {
      this.POSItemGrid[i].showoff = true;
    }
  }

  

  async getuomcode() {
    let response = await this.service.getsuom().catch(err => {
      console.log(err)
      this.toaster.showwarning(err.message, this.formname);
    })
    this.UOMCode = response.data;
    if(this.UOMCode.length == 1){
      this.model.Uom = response.data[0].UOMDesc;
    }
    else{
      this.UOMCode = response;
    }
  }
  async getposcode() {
    let response = await this.service.getpos().catch(err => {
      console.log(err)
    })
    this.poscode = response.data;

  }

  addRow(i: string | number) {


    if (this.isFirstRowNotFilled()) {

      this.toaster.showwarning('Please fill the required fields in the first row before adding another row.', 'ITEM MASTER');
      return;
    }

    const newRow = {
      itemdescription: this.model.itemdescription,
      rate: 0,
      uom: '',
      multiuom: '',
      poscode: this.POSItemGrid.length > 0 ? this.POSItemGrid[i].poscode : '',

    };

    this.POSItemGrid.push(newRow);
    //  this.resetTableFields();

  }
  isFirstRowNotFilled(): boolean {

    const firstRow = this.POSItemGrid[0];
    return (
      !firstRow.rate ||
      !firstRow.uom ||
      !firstRow.poscode
    );

  }



  isRowFilled(row: any): boolean {
    // Implement your logic to check if the row is filled or not
    return row.poscode && row.isChecked && row.rate && row.uom;
  }

  deleteNewRow(i: any) {
    this.POSItemGrid[i].rate = null;
    this.POSItemGrid[i].isChecked = false;
    

  }




  // getActivePOS(): POSItemGrid[] {
  //   return this.POSItemGrid.filter((poscode: { isActive: any; }) => poscode.isActive);
  // }



  formvalidation() {
    if (this.model.itemdescription == "" || this.model.itemdescription == null) {
      this.toaster.showwarning("Itemdescription should not be blank", "ITEM MASTER")
      return false
    }
    if (this.model.Uom == "" || this.model.Uom == null || this.model.Uom == "ADD UOM") {
      this.toaster.showerror('UOM cannot be blank', "ITEM MASTER")
      return false
    }
    // if( this.model.itemrate == "" ||this.model.itemrate == undefined || this.model.itemrate == null  ){
    //   this.toaster.showwarning('Item Rate cannot be blank,and not negative value', "ITEM MASTER")
    //   return false
    // }
    if( this.model.itemtax == "" ||this.model.itemtax == undefined || this.model.itemtax == null ){
      this.toaster.showwarning(' Item Tax cannot be blank',"ITEM MASTER")
      return false
    }
    if (this.model.openitem == undefined || this.model.openitem == null) {
      this.toaster.showwarning('Open Item cannot be blank', "ITEM MASTER")
      return false
    }
    if (this.model.creationdate == undefined || this.model.creationdate == null) {
      this.toaster.showwarning('Creation Date cannot be blank', "ITEM MASTER")
      return false
    }
    // if (this.model.multiuom == undefined || this.model.multiuom == null) {
    //   this.toaster.showwarning("Please Select Multi UOM to fill storeCode in gridbox", "ITEM MASTER");
    //   return false;
    // }
    let filterpos =  this.model.POSItemGrid.filter((e:any)=>e.isChecked == true)
    if(filterpos.length == 0){
      this.toaster.showwarning('Please Select Any One POS','')
      return false
    }
   
    for (let i = 0; i < this.model.POSItemGrid.length; i++) {
      if (this.model.POSItemGrid[i].isChecked == true ) {
        if (this.model.POSItemGrid[i].rate == null) {
          this.toaster.showwarning(" Rate cannot be blank ", "ITEM MASTER");
          return false;
        }
        // if ( this.POSItemGrid[i].Tax == null) {
        //   this.toaster.showwarning(" Tax cannot be blank ", "ITEM MASTER");
        //   return false;
        // }
      }
    }

    // if( this.POSItemGrid.uom == "" || this.POSItemGrid.uom == null || this.POSItemGrid.uom == undefined){
    //   this.toaster.showwarning("uom cannot be blank.", "ITEM MASTER");
    //   return false;

    // }
    // if (this.POSItemGrid.length > 0) {
    //   const firstRowUOM = this.POSItemGrid[0].uom;
    //   const newRowUOM = this.POSItemGrid[this.POSItemGrid.length - 1].uom;

    //   if (firstRowUOM === newRowUOM) {
    //     this.toaster.showwarning("UOM cannot be the same as the first row.", "ITEM MASTER");
    //     return false;
    //   }
    // }


    return true
  }
  preparemodel() {
    let mod = new itemmastermodel();
    mod.itemdescription = this.model.itemdescription;
    mod.Uom = this.model.Uom;
    mod.itemtax = this.model.itemtax;
    mod.tax = this.model.tax;
    mod.openitem = this.model.openitem;
    mod.creationdate = this.model.creationdate;
    mod.multiuom = this.model.multiuom;


    mod.Void = "N";
    mod.POSItemGrid = [];
    for (let i = 0; i < this.model.POSItemGrid.length; i++) {
      if(this.model.POSItemGrid[i].isChecked === true){
      this.obj = {
        itemdescription: this.model.itemdescription,
        rate: this.model.POSItemGrid[i].rate,
        uom: this.model.POSItemGrid[i].uom,
        // Tax: this.POSItemGrid[i].Tax,
        // multiuom: this.POSItemGrid[i].multiuom,
        poscode: this.model.POSItemGrid[i].poscode,
        isChecked: this.model.POSItemGrid[i].isChecked,
        Void: this.model.POSItemGrid[i].Void,
        createdBy: this.model.POSItemGrid[i].createdBy,
        createdAt: this.model.POSItemGrid[i].createdAt,
        updatedBy: this.model.POSItemGrid[i].updatedBy,
        updatedAt: this.model.POSItemGrid[i].updatedAt,
        voidedBy: this.model.POSItemGrid[i].voidedBy,
        voidedAt: this.model.POSItemGrid[i].voidedAt

      }

      mod.POSItemGrid.push(this.obj);
    }

    }

    return mod;
  }

  async onSelectcopy(event: any) {
    let item = event.value
    let response = await this.service.getitem(item).catch(err => {
      this.toaster.showwarning(err.message, "ITEM MASTER");

    });
    this.model = new itemmastermodel();

    this.model = response.data;
    let cVal: any = this.datePipe.transform(response.data.creationdate, 'yyyy-MM-dd', "+0000");
    this.model.creationdate = cVal;

    this.POSItemGrid = response.data2;

    // if (this.model.multiuom == 'YES') {
    //   this.model.multiuom = 'Y'
    // } else {
    //   this.model.multiuom = 'N'
    // }

    this.isupdate = true;
    // for(let i=0;i<response.data.length;i++)
    for (let i = 0; i < this.POSItemGrid.lenght; i++) {
      // this.POSItemGrid[i].poscode=response.data[i].poscode
      // this.POSItemGrid[i].isChecked=false;
      this.POSItemGrid[i].showoff = true;
    }
    // this._lable = "UPDATE";

    if (this.model.Void != null) {
      this.model.Void == 'N' ? this.IsVoid = false : this.IsVoid = true;
    }
    // if (this.model.multiuom == "Y") {
    //   this.hideStoreDesc = false;
    //   this.hideInventoryItem = false;
    // }

  }


  // omit_special_char(event: any) {
  //   var k;
  //   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
  //   return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  // }

  // (keypress)="omit_special_char($event)"

  onblurrate(event: any, i: any) {
    if (event.target.value < 0 || event.target.value >= 10000000) {
      this.POSItemGrid[i].rate = '';
    }
  }
  onbluritemtax(event: any) {
    if (event.target.value >= 100 || event.target.value < 0) {
      this.model.itemtax = '';
    }
  }




  async getdata() {

    let response = await this.service.getall().catch(err => {
      this.toaster.showerror(err.message, "ITEM MASTER");

      return;
    });

    this.itemlist = response.data.map((e: { itemdescription: any }) => e.itemdescription)

  }

  async getdatas() {
    let response = await this.service.getalldata().catch(err => {
      this.toaster.showwarning(err.message, "ITEM MASTER");

      return;
    });

    this.itemlist = response.data.map((e: { itemdescription: any }) => e.itemdescription)
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  async onSubmit() {
    // this.taxes = [];
   
    if (this.formvalidation() == true) {
      this.model.Void = "N"
      this.IsVoid = false
      if (this.isupdate == true) {
        const PrepareMode = this.preparemodel();
        let response = await this.service.updatedata(PrepareMode).catch(err => {
          console.log(err.message)
        })

        this.model = new itemmastermodel();
        this.toaster.showsucess('Record Update Successfully', "ITEM MASTER")
        this.refresh();
      }

      else {
        const PrepareMode = this.preparemodel();
        let response = await this.service.createdata(PrepareMode).catch(err => {
          console.log(err.message)
        })
        if (response.Boolval == true) {
          this.model = new itemmastermodel();
          this.toaster.showsucess('Record Saved Successfully', "ITEM MASTER")
          this.refresh();
        }
        else {
          this.toaster.showwarning(response.returnerror, "ITEM MASTER")
        }
      }
    }


  }

  async onVoid() {
    if (this.formvalidation() == true) {
      const editedMod = new itemmastermodel();
      editedMod.Void = this.model.Void == 'N' ? 'Y' : 'N';
      editedMod.itemdescription = this.model.itemdescription;
      let response = await this.service.voiditem(editedMod).catch(err => {
        console.error(err)
        this.toaster.showwarning(err, "ITEM MASTER")
        return false;
      })
      if (response != null) {
        if (response == "true" || this.IsVoid == false) {
          this.toaster.showsucess("Item Voided Successfully.", "ITEM MASTER")
          this.model = new itemmastermodel()
           this.refresh();
        } else {
          this.toaster.showsucess("Item UnVoided Successfully.", "ITEM MASTER")
          this.model = new itemmastermodel()
           this.refresh();

        }
      }
    }

   

  }




  onClear() {

    this.model = new itemmastermodel();
    this.refresh();
  }
  refresh(): void {
    window.location.reload();
  }
  onBack() {
    this.router.navigate(['/itemlist'], { relativeTo: this.route })
  }


}



function openDialog() {
  throw new Error('Function not implemented.');
}






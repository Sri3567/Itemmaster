export class itemmastermodel{
    
    itemdescription:string;
    Uom:string;
    // itemrate:string;
    itemtax:string;
    tax:string;
    openitem:number;
    creationdate:string;
    multiuom:string;

   
    Void: string;
    createdBy :string
  createdAt :string
  updatedBy :string
  updatedAt :string
  voidedBy :string
  voidedAt :string

    OpsType: string;   
  id: any;
  POSItemGrid:POSItemGrid[];
  poscode: any;
  
}

export class POSItemGrid{
  itemdescription: string 
  rate : string
  uom : string
  // multiuom : string
  Tax: string;
  poscode : string
  isChecked : boolean
  disablerate : boolean
  Void : string
  createdBy : string
  createdAt : string
  updatedBy : string
  updatedAt : string
  voidedBy : string
  voidedAt : string
  
}

export class ButtonModel {
  CreateBtn: boolean = false;
  PrintBtn: boolean = false;
  DeleteBtn: boolean = false;
  UpdateBtn: boolean = false;
  ExportBtn: boolean = false;
  ProcessBtn: boolean = false;
}

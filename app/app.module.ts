import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ItemMasterComponent } from './item-master/item-master.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DatePipe } from '@angular/common';
import { UomMasterComponent } from './uom-master/uom-master.component';
import { MatDialogModule } from '@angular/material/dialog';

import { ToastrModule } from 'ngx-toastr';
import { PosMasterComponent } from './pos-master/pos-master.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import { NetworkconnectionComponent } from './networkconnection/networkconnection.component';
import { TaxdetailsComponent } from './taxdetails/taxdetails.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ItemmasterListComponent } from './itemmaster-list/itemmaster-list.component';





@NgModule({
  declarations: [
    AppComponent,
    ItemMasterComponent,
    UomMasterComponent,
    PosMasterComponent,
    NetworkconnectionComponent,
    TaxdetailsComponent,
    ItemmasterListComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatPaginatorModule,
    TypeaheadModule.forRoot(),
    MatDialogModule,
    MatTableModule,
    MatChipsModule,
    ToastrModule.forRoot(
      {
        timeOut:3000,
        positionClass: 'toast-top-right',
        preventDuplicates:true
       }
    ),
    
    
  
  
    
    
    
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

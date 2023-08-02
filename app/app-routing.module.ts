import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemMasterComponent } from './item-master/item-master.component';
import { ItemmasterListComponent } from './itemmaster-list/itemmaster-list.component';

const routes: Routes = [{
  path:'itemedit/:itemdescription',
  component:ItemMasterComponent

},

{
  path:'itemlist',
  component:ItemmasterListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

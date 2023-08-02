import { formatDate } from '@angular/common';
import { Component, OnInit, Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({ providedIn: 'root' })

export class configuration{
    public localtimezone = "en-IN";
    public APIUrl: string = 'http://localhost:8098/api/';
   
    gGetDateyyyymmdd(par: any, divider: any = '-'): any {
        if (par == undefined) {
          return formatDate(new Date(), 'yyyy-MM-dd', this.localtimezone);
        }
        if (typeof (par) == 'object') {
          if (par.year != undefined && par.year != null && par != "") {
            return formatDate(
              par.year + divider + par.month + divider + par.day,
              'yyyy' + divider + 'MM' + divider + 'dd'
              , this.localtimezone
            );
          } else {
            return formatDate(par.toString(), 'yyyy-MM-dd', this.localtimezone);
          }
        } else {
          return formatDate(par, 'yyyy-MM-dd', this.localtimezone).toString();
        }
    
      }
      // single data export excel sheet
      exportArrayToExcel(data: any[], filename: string, sheetName: string) {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, worksheet, sheetName);
    
        /* save to file */
        XLSX.writeFile(wb, filename + '.xlsx');
    
      }
      // Multiple data export excel sheet
      exportMultiArrayToExcel(MultiArr: any[], filename: string,) {
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        for (let i=0;i<MultiArr.length;i++){
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(MultiArr[i].data);
          XLSX.utils.book_append_sheet(wb, worksheet, MultiArr[i].sheet);
        }
        /* save to file */
        XLSX.writeFile(wb, filename + '.xlsx');
    
      }
}
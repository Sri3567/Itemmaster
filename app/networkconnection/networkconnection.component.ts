import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-networkconnection',
  templateUrl: './networkconnection.component.html',
  styleUrls: ['./networkconnection.component.scss']
})
export class NetworkconnectionComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }
  isOnline: boolean;

  constructor() { }

  ngOnInit(): void {
    // Check initial internet connectivity status
    this.isOnline = navigator.onLine;

    // Listen for online/offline events
    window.addEventListener('online', this.updateStatus.bind(this));
    window.addEventListener('offline', this.updateStatus.bind(this));
  }

  updateStatus() {
    this.isOnline = navigator.onLine;
  }
  

}

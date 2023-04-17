import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  showAlert: boolean;
  alertMessage: string;

  constructor() {
    this.showAlert = false;
    this.alertMessage = '';
  }

  ngOnInit(): void {}

  onClose() {
    this.showAlert = false;
    this.alertMessage = '';
  }

  setAlert(message: string) {
    this.showAlert = true;
    this.alertMessage = message;
  }
}

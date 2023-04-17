import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit, AfterViewInit {
  username: string | undefined = '';
  client: Client = new Client();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('username')) {
      this.username = this.route.snapshot.paramMap.get('username')!;
    }

    this.client;
    this.getClientDetails();
  }

  ngAfterViewInit(): void {}

  viewClientList() {
    this.router.navigate(['/client/list/']);
  }

  getClientDetails() {
    const filteredClient = this.clientService.currentPageOfClients.filter(
      (x) => x.username === this.username
    );

    if (!filteredClient || filteredClient.length === 0) {
      return;
    }

    if (filteredClient.length > 0) {
      this.client = filteredClient[0];
    }
  }
}

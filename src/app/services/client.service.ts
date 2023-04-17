import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IClientResult } from '../models/IClientResult';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientUrl = environment.clientUrl;
  clients: Client[] = [];

  constructor(private http: HttpClient) {}

  getClients(
    pageSize: number,
    pageNumber: number,
    filterText: string
  ): Observable<Client[]> {
    if (filterText && this.clients) {
      const filteredClientData = this.filterClients(filterText);
      return of(filteredClientData);
    }

    return this.http
      .get<IClientResult>(
        `${this.clientUrl}?results=${pageSize}&page=${pageNumber}`
      )
      .pipe(
        map((data) => {
          this.clients = [];

          for (const person of data.results) {
            const client = new Client();
            client.name = `${person?.name?.title} ${person?.name?.first} ${person?.name?.last}`;
            client.email = person?.email;
            client.age = person?.dob?.age;
            client.phone = person.phone;
            client.username = person?.login?.username;

            this.clients.push(client);
          }

          return this.clients;
        })
      );
  }

  get currentPageOfClients(): Client[] {
    return this.clients;
  }

  private filterClients(query: string): Client[] {
    return this.clients.filter((client) => {
      const nameMatches: boolean | undefined = client.name
        ?.toLowerCase()
        ?.includes(query.toLowerCase());
      const ageMatches = client.age?.toString().includes(query);
      const emailMatches = client.email
        ?.toLowerCase()
        .includes(query.toLowerCase());
      const phoneNumberMatches = client.phone
        ?.toLowerCase()
        .includes(query.toLowerCase());
      return nameMatches || ageMatches || emailMatches || phoneNumberMatches;
    });
  }
}

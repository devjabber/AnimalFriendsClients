import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import { Observable, Subscription, fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { AlertComponent } from 'src/app/alert/alert.component';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(AlertComponent)
  alertComponent: AlertComponent | undefined;

  @ViewChild('searchClientsInput')
  searchClientsInput: ElementRef | undefined;

  readonly pageSize: number = 15;
  readonly defaultPageNumber: number = 1;
  readonly maxRow: number = 1000; //Set 1000th record to be the theoretical maximum for this exercise.
  filterText: string = '';

  gridApi: GridApi | undefined;
  subscription: Subscription | undefined;

  columnDefs: ColDef[] = [
    { field: 'name', width: 200 },
    { field: 'email', width: 250 },
    { field: 'age', width: 100 },
    { field: 'phone', width: 200 },
  ];

  defaultColDef: ColDef = {
    resizable: true,
  };

  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: 'infinite',
    cacheBlockSize: 15,
    paginationPageSize: 15,
  };

  rowData$: Observable<Client[]> | undefined;

  currentUser: string | undefined;

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      const pageNumber = Math.floor(params.endRow / this.pageSize);

      this.subscription = this.clientService
        .getClients(this.pageSize, pageNumber, this.filterText)
        .subscribe((data) => {
          params.successCallback(data, this.maxRow);
        });
    },
  };

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupClientSearch();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi?.sizeColumnsToFit();
    this.gridApi?.setDatasource(this.dataSource);
  }

  onCellClicked(event: CellClickedEvent) {
    this.currentUser = event.data.username;
  }

  viewClientDetails() {
    if (!this.currentUser) {
      this.alertComponent?.setAlert('Please select a user in the grid.');
      return;
    }

    this.router.navigate([`/client/details/${this.currentUser}`]);
  }

  setupClientSearch() {
    const query$ = fromEvent(
      this.searchClientsInput?.nativeElement as HTMLInputElement,
      'input'
    ).pipe(
      map((event) => (event.target as HTMLInputElement).value),
      debounceTime(500),
      distinctUntilChanged()
    );

    query$.subscribe((query) => {
      this.filterText = query;
      this.gridApi?.setDatasource(this.dataSource);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

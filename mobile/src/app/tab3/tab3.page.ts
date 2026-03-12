import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Table } from '../store/models/reservation.model';
import * as ReservationActions from '../store/actions/reservation.actions';
import * as ReservationSelectors from '../store/selectors/reservation.selectors';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  tables$: Observable<Table[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.tables$ = this.store.select(ReservationSelectors.selectAllTables);
    this.loading$ = this.store.select(ReservationSelectors.selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(ReservationActions.loadTables());
  }
}

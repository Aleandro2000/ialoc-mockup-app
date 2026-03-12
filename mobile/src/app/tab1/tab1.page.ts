import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Reservation, Table } from '../store/models/reservation.model';
import * as ReservationActions from '../store/actions/reservation.actions';
import * as ReservationSelectors from '../store/selectors/reservation.selectors';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit, OnDestroy {
  reservations$: Observable<Reservation[]>;
  tables$: Observable<Table[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.reservations$ = this.store.select(ReservationSelectors.selectAllReservations);
    this.tables$ = this.store.select(ReservationSelectors.selectAllTables);
    this.loading$ = this.store.select(ReservationSelectors.selectLoading);
    this.error$ = this.store.select(ReservationSelectors.selectError);
  }

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.store.dispatch(ReservationActions.loadReservations({ date: today }));
    this.store.dispatch(ReservationActions.loadTables());
    this.store.dispatch(ReservationActions.startPolling());
  }

  ngOnDestroy(): void {
    this.store.dispatch(ReservationActions.stopPolling());
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      case 'completed':
        return 'medium';
      default:
        return 'primary';
    }
  }

  formatTime(time: string): string {
    return time.substring(0, 5);
  }
}

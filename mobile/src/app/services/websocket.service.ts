import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, timer, Subscription } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { ReservationService } from './reservation.service';
import * as ReservationActions from '../store/actions/reservation.actions';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private polling$ = new Subject<void>();
  private stopPolling$ = new Subject<void>();
  private lastTimestamp = 0;
  private pollingSubscription: Subscription | null = null;

  constructor(
    private reservationService: ReservationService,
    private store: Store
  ) {}

  startPolling(): void {
    if (this.pollingSubscription) {
      return;
    }

    this.lastTimestamp = Math.floor(Date.now() / 1000);

    this.pollingSubscription = timer(0, 3000)
      .pipe(
        takeUntil(this.stopPolling$),
        switchMap(() => this.reservationService.pollMessages(this.lastTimestamp))
      )
      .subscribe({
        next: (response) => {
          this.lastTimestamp = response.timestamp;
          response.messages.forEach((msg) => {
            if (msg.event === 'reservation_created') {
              this.store.dispatch(ReservationActions.reservationReceived({ reservation: msg.data }));
            }
          });
        },
        error: (err) => {
          console.error('Polling error:', err);
        }
      });
  }

  stopPolling(): void {
    this.stopPolling$.next();
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
      this.pollingSubscription = null;
    }
  }

  ngOnDestroy(): void {
    this.stopPolling();
    this.polling$.complete();
    this.stopPolling$.complete();
  }
}

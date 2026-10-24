import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { checkAppInit } from '../../stores/users.actions';
import {
  selectIsAppInitialized,
  selectIsLoadingUsers,
  selectUsers,
  selectUsersError
} from '../../stores/users.selectors';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  private readonly store = inject(Store);
  readonly isInitialized$ = this.store.select(selectIsAppInitialized);
  readonly isLoading$ = this.store.select(selectIsLoadingUsers);
  readonly users$ = this.store.select(selectUsers);
  readonly error$ = this.store.select(selectUsersError);

  ngOnInit(): void {
    this.store.dispatch(checkAppInit());
  }
}

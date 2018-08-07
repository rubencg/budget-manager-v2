import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { Transfer } from '../../interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransferProvider {
  private transfersUrl: string;
  private transferRef;
  transfers: Transfer[];

  constructor(private db: AngularFireDatabase) {
    this.transfersUrl = 'transfers/';
    this.transferRef = db.list(this.transfersUrl).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  saveTransfer(expense: Transfer): firebase.database.ThenableReference {
    return this.db.list(this.transfersUrl).push(expense);
  }

  deleteTransfer($key: string): Promise<void> {
    return this.db.list(this.transfersUrl).remove($key);
  }

  updateTransfer($key: string, be: Transfer): Promise<void> {
    return this.db.list(this.transfersUrl)
      .update($key, {
        amount: be.amount,
        fromAccount: be.fromAccount,
        toAccount: be.toAccount,
        date: be.date
      });
  }

  getAllTransfers(): Observable<Transfer[]> {
    this.transferRef.subscribe(a => {
      this.transfers = a;
    });

    return this.transferRef;
  }

  getLocalTransfers(): Transfer[] {
    return this.transfers;
  }

}

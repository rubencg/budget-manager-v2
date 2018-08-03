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
    this.transferRef = this.db.list(this.transfersUrl);
  }

  saveTransfer(expense: Transfer): firebase.database.ThenableReference {
    return this.transferRef.push(expense);
  }

  deleteTransfer($key: string): firebase.database.ThenableReference {
    return this.transferRef.remove($key);
  }

  updateTransfer($key: string, be: Transfer): firebase.database.ThenableReference {
    return this.transferRef
      .update($key, {
        amount: be.amount,
        fromAccount: be.fromAccount,
        toAccount: be.toAccount,
        date: be.date
      });
  }

  getLocalBudgetExpenses(): Transfer[] {
    return this.transfers;
  }

}

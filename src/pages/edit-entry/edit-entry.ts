import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import moment from 'moment';
import { DatePicker } from '@ionic-native/date-picker';
import { EntryType, CategoryBasic, IdNameBasic, Account } from '../../interfaces';
import { EditAmountComponent } from '../../components/edit-amount/edit-amount';
import { EditAccountComponent } from '../../components/edit-account/edit-account';
import { EditCategoryComponent } from '../../components/edit-category/edit-category';

@IonicPage()
@Component({
  selector: 'page-edit-entry',
  templateUrl: 'edit-entry.html',
})
export class EditEntryPage {
  @Input() options: EditEntryOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, private viewCtrl: ViewController,
    private datePicker: DatePicker) {
  }

  ionViewDidLoad() {
    this.options = this.navParams.get("options");
    this.setDate(this.options.date);
  }

  setDate(date: Date) {
    this.options.dateString = moment(date).locale('es').format('ddd, DD MMMM YYYY');
  }

  editAmount(amount: number) {
    let modal = this.modalCtrl.create(EditAmountComponent, {
      amount: amount
    });

    modal.onDidDismiss(data => {
      if (data) {
        this.options.amount = data.amount;
      }
    });

    modal.present();
  }

  editAccount() {
    let modal = this.modalCtrl.create(EditAccountComponent);

    modal.onDidDismiss((account: Account) => {
      if (account) {
        this.options.account = {
          id: account.key,
          img: account.img,
          name: account.name
        };
      }
    });

    modal.present();
  }

  editCategory() {
    let modal = this.modalCtrl.create(EditCategoryComponent, {
      entryType: this.options.entryType
    });

    modal.onDidDismiss(data => {

      if (data) {
        this.options.category = data.category;
        if (this.options.category.subcategory) {
          this.options.category.subcategory = data.category.subcategory;
          this.options.category.subcategory.id = data.category.subcategory.id;
        }
      }
    });

    modal.present();
  }

  getCategoryName(category: CategoryBasic) {
    let sub: string = category.subcategory ? " > " + category.subcategory.name : "";
    return category.name + sub;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.options);
  }

  showDatePicker() {
    this.datePicker.show({
      date: this.options.date,
      mode: 'date',
      androidTheme: 4
    }).then(
      date => {
        this.options.date = date;
        this.setDate(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  applyIncome() {
    this.options.applyIncome = true;
    this.viewCtrl.dismiss(this.options);
  }

}

export interface EditEntryOptions {
  entryType: EntryType;
  amount: number;
  category: CategoryBasic;
  account: IdNameBasic;
  notes?: string;
  date: Date;
  dateString?: string;
  $key: string;
  applyIncome?: boolean;
  showIncomeButton: boolean;
}

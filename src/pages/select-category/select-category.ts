import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElementSelectComponent } from '../../components/element-select/element-select';
import { CategoryProvider } from '../../providers/category/category';
import { Category, EntryType } from '../../interfaces';
import _ from 'lodash';
import { SelectSubcategoryPage } from '../select-subcategory/select-subcategory';
import { SelectDatePage } from '../select-date/select-date';

@IonicPage()
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html',
})
export class SelectCategoryPage {
  @ViewChild('elementSelect') elementSelect: ElementSelectComponent;
  private categories: Category[];
  private goToPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private categoryProvider:CategoryProvider) {

  }

  ionViewDidLoad() {
    let entryType: EntryType = this.navParams.get("entryType");

    if(entryType == EntryType.Income){
      this.categories = this.categoryProvider.getIncomeCategoriesLocal();
      this.goToPage = SelectDatePage;
    }else{
      this.categories = this.categoryProvider.getExpenseCategoriesLocal();
      this.goToPage = SelectSubcategoryPage;
    }

    this.elementSelect.loadElements(this.categories);
  }

  categorySelected(category: Category) {
    let selectedCategory: Category = _.chain(this.categories)
        .filter((c: Category) => c.key == category.key)
        .value()[0]
        ;

    this.navCtrl.push(this.goToPage, {
      result: this.navParams.get('result'),
      entryType: this.navParams.get('entryType'),
      account: this.navParams.get('account'),
      category: selectedCategory
    });
  }

}

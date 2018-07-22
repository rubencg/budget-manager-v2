import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElementSelectComponent } from '../../components/element-select/element-select';
import { CategoryProvider } from '../../providers/category/category';
import { Category } from '../../interfaces';
import _ from 'lodash';
import { SelectSubcategoryPage } from '../select-subcategory/select-subcategory';

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
    this.goToPage = SelectSubcategoryPage;
  }

  ionViewDidLoad() {
    this.categories = this.categoryProvider.getExpenseCategoriesLocal();
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

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElementSelectComponent } from '../../components/element-select/element-select';
import { CategoryProvider } from '../../providers/category/category';


@IonicPage()
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html',
})
export class SelectCategoryPage {
  @ViewChild('elementSelect') elementSelect: ElementSelectComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams, private categoryProvider:CategoryProvider) {
  }

  ionViewDidLoad() {
    this.elementSelect.loadElements(this.categoryProvider.getExpenseCategoriesLocal());
  }

}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElementSelectComponent, SelectableElement } from '../../components/element-select/element-select';
import { Category, IdNameBasic } from '../../interfaces';
import _ from 'lodash';
import { SelectDatePage } from '../select-date/select-date';

@IonicPage()
@Component({
  selector: 'page-select-subcategory',
  templateUrl: 'select-subcategory.html',
})
export class SelectSubcategoryPage {
  @ViewChild('elementSelect') elementSelect: ElementSelectComponent;
  private category: Category;
  subcategories: Category[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.category = this.navParams.get("category");
    
    if(this.category){
      this.subcategories = _.chain(this.category.subcategories)
        .map(s => {
          let e: SelectableElement= {
            key: s.id,
            img: s.img,
            name: s.name
          };
          return e;
        })
        .value();

        this.elementSelect.loadElements(this.subcategories);
    }
  }

  subcategorySelected(subcategory: SelectableElement){
    let selectedSubcategory: IdNameBasic = _.chain(this.category.subcategories)
        .filter((c: IdNameBasic) => c.id == subcategory.key)
        .value()[0];

    this.navCtrl.push(SelectDatePage, {
      result: this.navParams.get('result'),
      entryType: this.navParams.get('entryType'),
      account: this.navParams.get('account'),
      category: this.navParams.get('category'),
      subcategory: selectedSubcategory
    });
  }

}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElementSelectComponent, SelectableElement } from '../../components/element-select/element-select';
import { Category } from '../../interfaces';

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

}

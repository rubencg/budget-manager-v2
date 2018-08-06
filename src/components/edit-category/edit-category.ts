import { Component, ViewChild } from '@angular/core';
import _ from 'lodash';
import { Category, EntryType, CategoryBasic } from '../../interfaces';
import { ElementSelectComponent, SelectableElement } from '../element-select/element-select';
import { ViewController, NavParams } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';

@Component({
  selector: 'edit-category',
  templateUrl: 'edit-category.html'
})
export class EditCategoryComponent {

  subCategories;
  categories: Category[];
  selectedCategory: Category;
  entryType: EntryType;

  @ViewChild('elementSelectCategory') elementSelectCategory: ElementSelectComponent;
  @ViewChild('elementSelectSubCategories') elementSelectSubCategories: ElementSelectComponent;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private categoriesService: CategoryProvider) {

  }

  ionViewDidLoad() {
    this.entryType = this.navParams.get("entryType");
    if (this.entryType == EntryType.Income) {
      this.categories = this.categoriesService.getIncomeCategoriesLocal();
    } else {
      this.categories = this.categoriesService.getExpenseCategoriesLocal();
    }

    this.elementSelectCategory.loadElements(this.categories);
  }

  categorySelected(category: Category) {
    if (this.entryType == EntryType.Income) {
      this.viewCtrl.dismiss({
        category: category
      });
    } else {
      this.selectedCategory = category;
      this.subCategories = _.chain(category.subcategories)
        .map(a => {
          let s: SelectableElement = {
            key: a.id,
            name: a.name,
            img: a.img
          }
          return s;
        })
        .value();
      setTimeout(() => {
        this.elementSelectSubCategories.loadElements(this.subCategories);
      }, 10);
    }
  }

  subCategorySelected(s: SelectableElement) {
    let category: CategoryBasic = {
      id: this.selectedCategory.key.toString(),
      name: this.selectedCategory.name,
      subcategory: null,
      img: this.selectedCategory.img
    };
    category.subcategory = {
      img: s.img,
      name: s.name,
      id: s.key,
    };

    this.viewCtrl.dismiss({
      category: category
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}

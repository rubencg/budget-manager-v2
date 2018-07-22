import { Component, Input, Output, EventEmitter } from '@angular/core';
import _ from 'lodash';

@Component({
    selector: 'element-select',
    templateUrl: 'element-select.html'
})
export class ElementSelectComponent {

    private elementChunks: SelectableElement[][];
    private elements: SelectableElement[];

    @Output() onElementSelected = new EventEmitter<SelectableElement>();

    constructor() {
    }

    loadElements(elements: SelectableElement[]) {
        this.elements = elements;
        console.log(elements);
        
        if (elements) {
            this.elementChunks = _.chain(elements)
                .chunk(3)
                .value();
        }
    }

    elementSelected(id: string) {
        let selectedElement = _.chain(this.elements)
            .filter((c: SelectableElement) => c.key == id)
            .value()[0];
        this.onElementSelected.emit(selectedElement);
    }

}

export interface SelectableElement {
    key?: string;
    name: string;
    img?: string;
}
import { Component } from '@angular/core';

@Component({
  selector: 'calculator',
  templateUrl: 'calculator.html'
})
export class CalculatorComponent {

  private result: string;
    private decimal: boolean;
    private total: Array<number>;
    private clear: boolean;
    private previous_operator: any;

    constructor() {
        this.clearAll();
    }

    public setResult(amount: number){
        this.result = amount.toString();
    }

    public getResult() : number{
        return +this.result;
    }

    addToCalculation(value) {

        if(this.clear == true) {
            this.result =  '';
            this.clear = false;
        }

        if(value == '.') {

            if(this.decimal == true) {
                return false;
            }

            this.decimal = true;

        }
        this.result += value;
    }

    calculate(operator) {

        this.total.push(+this.result);

        if(this.total.length == 2) {
            var a = Number(this.total[0]);
            var b = Number(this.total[1]);

            if(this.previous_operator == '+') {
                var total = a + b;
            } else if(this.previous_operator == '-') {
                var total = a - b;
            } else if(this.previous_operator == '*') {
                var total = a * b;
            } else {
                var total = a / b;
            }
            let answer = total;

            this.total = [];
            this.total.push(answer);
            this.result = total.toString();
        }
        this.clear = true;

        this.decimal = false;
        this.previous_operator = operator;

    }

    setToNegativePositive(){
        this.result = ((+this.result) * -1).toString();
    }

    getTotal() {
        var a = Number(this.total[0]);
        var b = Number(this.result);

        if(this.previous_operator == '+') {
            var total = a + b;
        } else if(this.previous_operator == '-') {
            var total = a - b;
        } else if(this.previous_operator == '*') {
            var total = a * b;
        } else {
            var total = a / b;
        }

        if(isNaN(total)) {
            return false;
        }

        this.result = total.toString();
        this.total = [];
        this.clear = true;
    }

    clearAll(){
        this.result = '0';
        this.decimal = false;
        this.total = [];
        this.clear = true;
        this.previous_operator = false;
    }

    deleteLastChar(){
        if(this.result.length == 1){
            this.result = '0';
        }else{
            this.result = this.result.substring(0, this.result.length - 1);
        }
    }

}

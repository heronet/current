import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Currency } from './models/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  CURRENCY_API_KEY: string = 'cff04706919575ebb9cd';
  available_currencies: Currency;
  converted_amount: string;
  converted_cur: string;
  converted_symbol: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(
        `https://free.currconv.com/api/v7/currencies?apiKey=${this.CURRENCY_API_KEY}`
      )
      .subscribe((res: Currency) => {
        this.available_currencies = res;
      });
  }
  onClickConvert(selected_cur: string, converted_cur: string, amount: number) {
    this.http
      .get(
        `https://free.currconv.com/api/v7/convert?apiKey=${this.CURRENCY_API_KEY}&q=${selected_cur}_${converted_cur}&compact=ultra`
      )
      .subscribe((res: { converted: string; amount: number }) => {
        this.converted_amount = (amount * res[Object.keys(res)[0]]).toString();
        this.converted_cur = converted_cur;
        this.converted_symbol =
          this.available_currencies.results[converted_cur].currencySymbol;
      });
  }
}

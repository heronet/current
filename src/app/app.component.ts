import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Currency } from './models/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  CURRENCY_API_KEY: string = "009847a6f613b87f484d";
  available_currencies: string[] = [];
  converted_amount: string;
  converted_cur: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`https://free.currconv.com/api/v7/currencies?apiKey=${this.CURRENCY_API_KEY}`).subscribe((res: Currency) => {
      for(const code in res.results) {
        this.available_currencies.push(code);
      }
      this.available_currencies.sort();
    });
  }
  onClickConvert(selected_cur: string, converted_cur: string, amount: number) {
    this.http.get(`https://free.currconv.com/api/v7/convert?apiKey=${this.CURRENCY_API_KEY}&q=${selected_cur}_${converted_cur}&compact=ultra`).subscribe((res: {converted: string, amount: number}) => {
      this.converted_amount = ((res[Object.keys(res)[0]]) * amount).toPrecision(5);
      this.converted_cur = converted_cur;
    })
  }
}

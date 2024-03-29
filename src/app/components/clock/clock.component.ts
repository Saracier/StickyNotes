import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';
import { responseWorldTimeApi } from 'src/app/interfaces/responseWorldTimeApi';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit, OnDestroy {
  hour: string;
  minute: string;
  second: string;
  firstObsSubscripcion$: Subscription;
  customIntervalObservable$ = interval(1000);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<responseWorldTimeApi>(
        'https://worldtimeapi.org/api/timezone/Europe/Warsaw'
      )
      .subscribe((res) => {
        const resDate = new Date(res.datetime);
        this.hour = resDate.getHours().toString();
        this.minute = resDate.getMinutes().toString();
        this.second = resDate.getSeconds().toString();
      });

    this.firstObsSubscripcion$ = this.customIntervalObservable$.subscribe(
      () => {
        this.updateTime();
      },
      (error: Error) => {
        alert(error);
      },
      () => {
        alert('Observable completed');
      }
    );
  }

  ngOnDestroy() {
    this.firstObsSubscripcion$.unsubscribe();
  }

  updateTime() {
    let localSecond = Number(this.second);
    let localMinute = Number(this.minute);
    let localHour = Number(this.hour);

    localSecond++;

    if (localSecond > 60) {
      localSecond = 0;
      localMinute++;
    }
    if (localMinute > 60) {
      localMinute = 0;
      localHour++;
    }
    if (localHour > 24) {
      localHour = 0;
    }
    this.second = localSecond < 10 ? `0${localSecond}` : localSecond.toString();
    this.minute = localMinute < 10 ? `0${localMinute}` : localMinute.toString();
    this.hour = localHour < 10 ? `0${localHour}` : localHour.toString();
  }
}

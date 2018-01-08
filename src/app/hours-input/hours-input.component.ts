import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-hours-input',
  templateUrl: './hours-input.component.html',
  styleUrls: ['./hours-input.component.css']
})
export class HoursInputComponent implements OnInit {

  constructor() { }
  form;

  ngOnInit() {
    this.form = new FormGroup({
        day: new FormControl(Date.now()),
        begin: new FormControl('', this.beginHoursValidator),
        end: new FormControl('', this.endHoursValidator)
    });
  }

  beginHoursValidator(control) {
    let value;
    value = control.value;
    console.log(value);
    if (value.match('[0-9]{2}h[0-9]{2}')) {
        let hours;
        hours = parseInt(value.substr(0, 2), 0);
        let minutes;
        minutes = parseInt(value.substr(3, 2), 0);
        if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
            return {'begin': true};
        }
    }

      return {'begin': false};
  }

    endHoursValidator(control) {
        let value;
        value = control.value;
        console.log(value);
        if (value.match('[0-9]{2}h[0-9]{2}')) {
            let hours;
            hours = parseInt(value.substr(0, 2), 0);
            let minutes;
            minutes = parseInt(value.substr(3, 2), 0);
            if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
                return {'begin': true};
            }
        }

        return {'begin': false};
    }

  addHours() {
      console.log('added');
  }
}

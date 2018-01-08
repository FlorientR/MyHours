import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-hours-input',
    templateUrl: './hours-input.component.html',
    styleUrls: ['./hours-input.component.css']
})
export class HoursInputComponent implements OnInit {

    constructor() {
    }

    form;

    ngOnInit() {
        this.form = new FormGroup({
            day: new FormControl('', Validators.required),
            begin: new FormControl('', this.beginHoursValidator),
            end: new FormControl('', this.endHoursValidator)
        });
    }

    beginHoursValidator(control: FormControl) {
        const value = control.value;
        if (value.match('^[0-9]{2}h[0-9]{2}$')) {
            const hours = parseInt(value.substr(0, 2), 0);
            const minutes = parseInt(value.substr(3, 2), 0);
            if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
                return null;
            }
        }

        return {'begin': false};
    }

    endHoursValidator(control: FormControl) {
        const value = control.value;
        if (value.match('^[0-9]{2}h[0-9]{2}$')) {
            const hours = parseInt(value.substr(0, 2), 0);
            const minutes = parseInt(value.substr(3, 2), 0);
            const totalMinutes = (hours * 60) + minutes;

            const beginValue = control.parent.get('begin').value;
            const beginHours = parseInt(beginValue.substr(0, 2), 0);
            const beginMinutes = parseInt(beginValue.substr(3, 2), 0);
            const totalBeginMinutes = (beginHours * 60) + beginMinutes;

            if (
                (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60)
                && (totalBeginMinutes < totalMinutes)
            ) {
                return null;
            }
        }

        return {'end': false};
    }

    addSession = function(session) {
        console.log(session);
    }
}

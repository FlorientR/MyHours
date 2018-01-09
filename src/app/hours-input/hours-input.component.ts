import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {SessionService} from '../session.service';

@Component({
    selector: 'app-hours-input',
    templateUrl: './hours-input.component.html',
    styleUrls: [
        './hours-input.component.css',
        '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
    ]
})
export class HoursInputComponent implements OnInit {

    constructor(private sessionService: SessionService) {}

    form;
    sessions;
    total;

    ngOnInit() {
        this.sessionService.updateSessions();
        this.sessions = this.sessionService.getSessions();
        this.sessions = this.sessionService.reorderSession(this.sessions);
        this.total = this.sessionService.getTotal();

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

            const sessionService = new SessionService(null);
            const totalMinutes = sessionService.getTotalMinutes(value);

            const beginValue = control.parent.get('begin').value;
            const totalBeginMinutes = sessionService.getTotalMinutes(beginValue);

            if (
                (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60)
                && (totalBeginMinutes < totalMinutes)
            ) {
                return null;
            }
        }

        return {'end': false};
    }

    addSession = function(session)
    {
        this.sessionService.addSession(session);
        this.sessions = this.sessionService.getSessions();
        this.total = this.sessionService.getTotal();
    }

    removeSession = function (indiceSession, indiceDate) {
        this.sessionService.removeSession(indiceSession, indiceDate);
        this.sessions = this.sessionService.getSessions();
        this.total = this.sessionService.getTotal();
    }

    removeAll = function()
    {
        this.sessionService.removeAll();
        this.sessions = [];
        this.total = 0;
    }
}

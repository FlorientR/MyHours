import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

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
        begin: new FormControl(),
        end: new FormControl()
    });
  }

}

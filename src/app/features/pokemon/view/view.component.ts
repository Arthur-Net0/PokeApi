import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  abilitiesStyle = {
    "display": "flex",
    "flex-direction": "column",
    "padding": "15px",
    "align-items": "center"
  }
}

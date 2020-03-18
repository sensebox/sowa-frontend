import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'senph-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent implements OnInit {

  @Input() title: string;
  @Input()  subtitle: string;
  @Input()  button: string;
  @Input()  button2: string;
  @Output() myEvent = new EventEmitter();
  @Output() myEvent2 = new EventEmitter();
  @Input() valid: string;

  

  constructor() { }

  buttonClick(){
    this.myEvent.emit(null)
  }

  buttonClick2(){
    this.myEvent2.emit(null)
  }

  ngOnInit() {
  }

}

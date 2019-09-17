import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'senph-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent implements OnInit {

  @Input() title: string;
  @Input()  subtitle: string;

  constructor() { }

  ngOnInit() {
  }

}

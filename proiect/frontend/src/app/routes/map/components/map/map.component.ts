import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/map.js";
    this.elementRef.nativeElement.appendChild(s);

    s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.defer = true;
    s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBzUKu6sK92Gi4iIbgY0k2ZODLBlF_-5qk&callback=initMap";
    this.elementRef.nativeElement.appendChild(s);
  }

}

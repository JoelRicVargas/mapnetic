import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css']
})
export class MapMarkerComponent implements OnInit {

  @Input() transform_x : String = "200";
  @Input() transform_y : String = "250";

  constructor() { }

  ngOnInit(): void {
  }

}

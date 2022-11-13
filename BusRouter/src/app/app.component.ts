
import {} from 'googlemaps';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements AfterViewInit{
  title = 'BusRouter';
  @ViewChild('map') mapElement: any;
  map: google.maps.Map | undefined;
  
  ngAfterViewInit(): void {
    const mapProperties = {
         center: new google.maps.LatLng(37.7749, -122.4194),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
    this.addMarker(1,{ lat: 37.7749, lng: -122.4194}, this.map);
    this.addMarker(2,{ lat: 37.7750, lng: -122.4194}, this.map);
    var test = require('./grabberOut.json');
    console.log(test.length)
    let x=0
    let y=0
    for (let i=0;i<test.length;i++){
      x=test[i].long
      y=test[i].lat
      this.addMarker(test[i].bucket,{lat: y, lng: x}, this.map);
    }
   
 } 

  addMarker(color: any,position: any, map: any) {
    if (color==0){
      const marker = new google.maps.Marker({
          position: position,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          },
          map: map
      });
    }
    else if (color==1){
      const marker = new google.maps.Marker({
        position: position,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
        },
        map: map
    });
    }
    else if (color==2){
      const marker = new google.maps.Marker({
        position: position,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        },
        map: map
    });
    }
    else if (color==3){
      const marker = new google.maps.Marker({
        position: position,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png"
        },
        map: map
    });
    }
    else{
      const marker = new google.maps.Marker({
        position: position,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
        },
        map: map
    });
    }
  }
}
 
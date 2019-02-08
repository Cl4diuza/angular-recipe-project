import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDxbwRsiuCs_sYEZOnvR299fRyosh04zTI',
      authDomain: 'recipe-project-ng.firebaseapp.com'
    });
  }

  OnNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
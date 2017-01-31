import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      let db = new SQLite();
      db.openDatabase({
        name: "mynote.db",
        location: "default"
      }).then(() => {
        db.executeSql("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), note TEXT, datenote VARCHAR(100))",{})
        .then((data) => {
          // alert("Table is created : "+JSON.stringify(data));
        }, (error) => {
          // alert("Unable to execute sql : "+JSON.stringify(error));
        })
      }, (error) => {
        // alert("Unable to open database : "+JSON.stringify(error));
      })
    });
  }
}
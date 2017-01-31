import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Clipboard  } from 'ionic-native';
import { NoteServices } from '../../providers/note-services';

@Component({
  templateUrl: 'note.html'
})
export class ShowNote {
  public hb : any;
  public copText : any;

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, 
              public navParams: NavParams,public toastCtrl: ToastController,
              private noteServices: NoteServices ) {
      this.hb = this.navParams.get('idn');
      this.noteServices.retrieveNote(this.hb);
  }

  public dismiss() {
    this.viewCtrl.dismiss().then(()=>{
    
    });
  }

  public copyNote(textNote){
    Clipboard.copy(textNote).then((sc) => {
      let toastCp = this.toastCtrl.create({
        message: 'copied',
        duration: 2000,
        position: 'top'
      });

      toastCp.present();
    },(err)=>{});
  }

}

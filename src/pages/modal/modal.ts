import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { NoteServices } from '../../providers/note-services';

@Component({
  templateUrl: 'modal.html'
})
export class ModalShow {
  public note : any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, 
				public navParams: NavParams, private fb: FormBuilder,
				public loadingCtrl: LoadingController, private noteServices: NoteServices ) {

      this.note = this.fb.group({
        title : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        note  : [''],
      });
  }


  public dismiss() {
      this.viewCtrl.dismiss().then(()=>{
        this.noteServices.refreshDatabase();
        // this.noteServices.refreshLorem();
      });
  }

  public addNote(){
    let lan = this.noteServices.loadWait("Adding note...");
    lan.present();
    this.noteServices.createNote(this.note.value.title,this.note.value.note);
    this.note.reset();
	  lan.dismiss();
  }

}

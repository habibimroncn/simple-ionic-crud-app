import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { NoteServices } from '../../providers/note-services';

@Component({
  templateUrl: 'editnote.html'
})
export class EditNote {
  public edhb : any;
  public note : any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private fb: FormBuilder, private noteServices: NoteServices ) {
      this.edhb = this.navParams.get('uid');
      this.note = this.fb.group({
		        title : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            note : [''],
      });
      this.noteServices.getNote(this.edhb);
  }

  public dismiss() {
    this.viewCtrl.dismiss().then(()=>{
      this.noteServices.refreshDatabase();
    });
  }

  public updateNote(){
    let lun = this.noteServices.loadWait("Updating note...");
    lun.present();
    this.noteServices.updateNote(this.note.value.title,this.note.value.note);
    lun.dismiss();
  }
}
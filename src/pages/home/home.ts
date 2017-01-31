import { Component } from '@angular/core';
import { NavController, Platform, ModalController, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { ModalShow } from '../modal/modal';
import { ShowNote } from '../note/note';
import { EditNote } from '../editnote/editnote';
import { NoteServices } from '../../providers/note-services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
  				public platform: Platform,
					public modalCtrl: ModalController,
					public alertCtrl: AlertController,
					public actionSheetCtrl: ActionSheetController,
					public loadingCtrl: LoadingController,
					private noteServices: NoteServices) {
			platform.ready().then(() => {
				this.noteServices.DB.openDatabase({
						name: "mynote.db",
						location: "default"
					}).then(() => {
						this.noteServices.refreshDatabase();
					}, (error) => {

				});

				

			}); /* End of platform */

  }
	
	public createNote(name){
		let openModal = this.modalCtrl.create(ModalShow,name);
		openModal.present();
	}

	public getShowNote(nid){
		let sn = this.modalCtrl.create(ShowNote,{idn: nid});
		sn.present();
	}

	public getUpNote(noteid){
		let usn = this.modalCtrl.create(EditNote,{uid: noteid});
		usn.present();
	}

  public presentActionSheet(idNote) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Notes',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Open',
          icon: !this.platform.is('ios') ? 'open' : null,
          handler: () => {
						this.getShowNote(idNote);
          }
        },
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
						this.getUpNote(idNote);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {}
        }
      ]
    });
    actionSheet.present();
  }

	public deleteNote(noteID){
		this.noteServices.deleteNote(noteID);
	}

	public refresh() {
		let loadWait = this.loadingCtrl.create({
			 content: "Please wait...",
		});
		loadWait.present();
		this.noteServices.refreshDatabase();
		// this.noteServices.refreshLorem();
		loadWait.dismiss();
	}
}
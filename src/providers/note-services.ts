import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform, LoadingController, AlertController } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import 'rxjs/add/operator/map';

/*
  Generated class for the NoteServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NoteServices {

  public DB: SQLite;
  public DateNow: any;
  public ArrNotes: Array<Object>;
  public RetrieveNote: Array<Object>;
  public note: any;
  public title_val: any = '';
  public note_val: any = '';
  public idNoteUpdate: number;

  constructor(public http: Http, public loadingCtrl: LoadingController, public platfrom: Platform, public alertCtrl: AlertController) {
    platfrom.ready().then(() => {
      this.DB = new SQLite();
      this.DB.openDatabase({
        name: "mynote.db",
        location: "default"
      }).then(() => {

      }, (error) => {

      });
    });
  }

  createNote(title,note){
	  this.DateNow = new Date().toLocaleString();
      this.DB.executeSql("INSERT INTO notes (title, note, datenote) VALUES (?,?,?)",[title, note, this.DateNow])
		.then((data) => {
			// alert("Inserted : "+JSON.stringify(data));
		},(error) => {
			// alert("Error : "+JSON.stringify(error.err));
		});
  }

  getNote(idNote){
    this.DB.executeSql("SELECT * FROM notes WHERE id = ?",[idNote]).then((data) => {
      this.ArrNotes = [];
            if(data.rows.length > 0) {
                  for(var i = 0; i < data.rows.length; i++) {
                    this.title_val = data.rows.item(i).title;
                    this.note_val = data.rows.item(i).note;
                    this.idNoteUpdate = data.rows.item(i).id;
                  }
            }       
    });
  }

  retrieveNote(idNote){
    this.DB.executeSql("SELECT * FROM notes WHERE id = ?",[idNote]).then((data) => {
       this.RetrieveNote = [];
        if(data.rows.length > 0) {
              for(var i = 0; i < data.rows.length; i++) {
                this.RetrieveNote.push({
                  ID : data.rows.item(i).id,
                  Title : data.rows.item(i).title,
                  Note: data.rows.item(i).note,
                  Date: data.rows.item(i).datenote
                });
              }
       }
    });
    return this.RetrieveNote;
  }

  updateNote(title,note){
    this.DateNow = new Date().toLocaleString();
      this.DB.executeSql("UPDATE notes SET title = ?, note = ?, datenote = ? WHERE id = ?",[title,note,this.DateNow,this.idNoteUpdate])
      .then((data)=>{
          // alert(data);
      },(err)=>{
          // alert("err : "+JSON.stringify(err));
    });
  }

  deleteNote(idNote){
    let alertConfirmDelete = this.alertCtrl.create({
		    title: 'Confirm delete',
		    message: 'Do you want to delete this note?',
		    buttons: [
		      {
		        text: 'Cancel',
		        role: 'cancel',
		        handler: () => {}
		      },
		      {
		        text: 'Ok',
		        handler: () => {
							this.DB.openDatabase({
								name: "mynote.db",
								location: "default"
							}).then(() => {
								this.DB.executeSql("DELETE FROM notes WHERE id = ?",[idNote]).then(()=>{
                  this.refreshDatabase();
								})
							}, (error) => {
							});
		        }
		      }
		    ]
		});
  		alertConfirmDelete.present();
  }

  refreshDatabase(){
    this.DB.executeSql("SELECT * FROM notes ORDER BY id DESC",[])
		.then((data) => {
			this.ArrNotes = [];
			if(data.rows.length > 0) {
				for(var i = 0; i < data.rows.length; i++) {
					this.ArrNotes.push({
						ID : data.rows.item(i).id,
						Title : data.rows.item(i).title,
						Note: data.rows.item(i).note,
						Date: data.rows.item(i).datenote
					});
				}
			}
		}, (error) => {});

    return this.ArrNotes;
  }

  loadWait(desc){
    let loadingWait = this.loadingCtrl.create({
			 content: desc,
		});

    return loadingWait;
  }
}
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ModalShow } from '../pages/modal/modal';
import { ShowNote } from '../pages/note/note';
import { EditNote } from '../pages/editnote/editnote';
import { NoteServices } from '../providers/note-services';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ModalShow,
    ShowNote,
    EditNote,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ModalShow,
    ShowNote,
    EditNote,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, NoteServices]
})
export class AppModule {}

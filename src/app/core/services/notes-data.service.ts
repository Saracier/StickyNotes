import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { INote } from '../../interfaces/inote';
=======
<<<<<<<< HEAD:src/app/core/notes-data.service.ts
import { INote } from '../interfaces/inote';
========
import { DeletedNotesService } from './deleted-notes.service';
import { INote } from '../../interfaces/inote';
>>>>>>>> newFeature:src/app/core/services/notes-data.service.ts
>>>>>>> newFeature

@Injectable({
  providedIn: 'root',
})
export class NotesDataService {
  notes: INote[] = [
    {
      id: 456456,
      title: 'Hello World My Wonderfoul place',
      text: 'Hello from the other site',
    },
    { id: 23423424, title: 'Hello Giedi Prime', text: 'I love Dune books' },
    { id: 6363688, title: 'Hello There', text: 'General Kenobi' },
  ];

  addNewNote(id: number, title: string, text: string) {
    this.notes.push({
      id: id,
      title: title,
      text: text,
    });
  }

  // handleServerRes() {
  //   this.httpService.fetchNotesFromBackend.subscribe(res => {
  //     this.addNewNote(res);
  //   }
  //     ))
  // }

  onDeleteSingleNote(deleteObject: { id: number }) {
    const numberInArray = this.notes.findIndex((element) => {
      return element.id === Number(deleteObject.id);
    });
    if (numberInArray < 0)
      throw new Error(
        'something went wrong. Index of note for delete exeeded array'
      );
    this.notes.splice(numberInArray, 1);
  }
}
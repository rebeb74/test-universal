import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagesResolver implements Resolve<any> {

  constructor(
    private db: AngularFireDatabase
  ) { }

  resolve(): Observable<any> {
    return this.db.list('/pages').snapshotChanges().pipe(
      map((uploadData) => {
        const newUploadData = uploadData.map(c => ({ key: c.payload.key, ...c.payload.val() as any }));
        console.log(newUploadData)
        return newUploadData;
      }),
      take(1)
    );
  }

}

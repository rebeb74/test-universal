import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, mergeMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagesResolver implements Resolve<any> {

  constructor(
    private db: AngularFireDatabase
  ) { }

  // async resolve(): Promise<Observable<any>> {
  //   await this.pageDbService.data$.pipe(take(1)).toPromise();
  //   return this.pageDbService.data$;
  // }
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

  // resolve(): Observable<Page[]> {
  //   return this.pageDbService.getPages().snapshotChanges().pipe(
  //     map((pages) => {
  //       const newPages = pages.map(c => ({ key: c.payload.key, ...c.payload.val() as any }));
  //       this.pagesService.setPages(newPages)
  //       return newPages;
  //     }),
  //     take(1)
  //   );
  // }
}

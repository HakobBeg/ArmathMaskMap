import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {City, CityData, CountOfPlace} from '../../Models/simpleModels';

@Injectable({
  providedIn: 'root'
})
export class DatabaseWorkerService {

  constructor(private db: AngularFirestore) {
  }

  $ChangeNotifier = new BehaviorSubject<string>('false');

  getCities() {

    return this.db.doc<CityData>('data/cities');

  }

  getPlacesById(id) {
    return this.db.collection(`AllData/data/cities/${id}/places`);
  }


  dispatcher(action: string){
    this.$ChangeNotifier.next(action);
  }


  saveChanges() {
    this.$ChangeNotifier.next('true');
  }


  update(data: City[]) {

    data.map((city) => {
      return {
        name: city.name, list: city.list.map((plc) => {
          return {name: plc.name, count: plc.count};
        })
      };
    });


    this.db.doc('data/cities').update({cities: data}).then((x) => {
      alert('Պահպանված է');
    }).catch((err) => {
      alert('Խափանում պահպանման ընթացքում');
    });
  }

}

import {AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DatabaseWorkerService} from '../../Services/database-worker.service';
import {City, CountOfPlace} from '../../../Models/simpleModels';
import {MatDialog} from '@angular/material/dialog';
import {EditingPopupComponent} from '../editing-popup/editing-popup.component';
import {strict} from 'assert';
import {AuthentificationService} from '../../Services/authentification.service';
import {startAnimationTrigger} from '../../../Animations/simpleAnimations';
import {fromEvent, Observable} from 'rxjs';
import {log} from 'util';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  animations: [startAnimationTrigger]
})
export class ContentComponent implements OnInit, AfterViewChecked {

  cityTmpId = 1;
  data: City[] = [];
  globalSum = 0;
  globalAddShow = false;
  animationState = 'void';
  showSpinner = true;
  parentAnimState = 'void';
  winWidth = window.innerWidth;



  @ViewChild('listDef') listDef: ElementRef;


  constructor(private dbWorker: DatabaseWorkerService, public dialog: MatDialog, private auth: AuthentificationService) {
  }


  get isLoggedIn() {
    return this.auth.isLoggedIn;

  }


  saveChanges() {
    this.dbWorker.update(this.data);
  }


  calculate() {
    let gSum = 0;

    this.data.forEach((city) => {
      let lSum = 0;
      city.list.forEach((place) => {
        lSum += Number(place.count);
      });
      city.count = lSum;
      gSum += lSum;
    });

    this.globalSum = gSum;

  }


  openDialog(act: string, cityId?: string): void {
    const dialogRef = this.dialog.open(EditingPopupComponent, {
      width: '250px',
      data: {name: '', count: 0, action: act, id: cityId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (act === 'addCount') {
          this.data.forEach((city) => {
            if (city.id === cityId) {
              city.list.push({id: city.plId, flag: false, count: result.count, name: result.name});
              city.count += Number(result.count);
              this.globalSum += Number(result.count);
              city.plId = (Number(city.plId) + 1).toString();
            }
          });
        } else {
          this.data.push({id: this.cityTmpId.toString(), count: 0, list: [], name: result.name});
          this.cityTmpId++;
        }
      }
    });
  }


  addCity() {

    this.openDialog('addCity');
  }


  addPlc(cityId: string) {
    this.openDialog('addCount', cityId);
  }


  ngAfterViewChecked(): void {
    if (this.listDef && this.listDef.nativeElement.firstElementChild.nextElementSibling && this.listDef.nativeElement) {
      const beforeSize = (Number(getComputedStyle(this.listDef.nativeElement.firstElementChild.nextElementSibling).width.slice(0, -2)) + Number(getComputedStyle(this.listDef.nativeElement.lastElementChild).width.slice(0, -2))) / 2;
      const firstWidth = Number(getComputedStyle(this.listDef.nativeElement.firstElementChild.nextElementSibling).width.slice(0, -2)) / 2;
      this.listDef.nativeElement.firstElementChild.style.width = `calc(100% - ${beforeSize + 40}px)`;
      this.listDef.nativeElement.firstElementChild.style.left = `${firstWidth + 20}px`;
    }


  }

  removeCity(id: string) {

    this.data.forEach((city, index) => {
      if (city.id === id) {
        this.data.splice(index, 1);
      }
    });
    this.calculate();
  }

  removePlace(cityID: string, placeID: string) {
    this.data.forEach((city) => {
      if (city.id === cityID) {
        city.list.forEach((place, index) => {
          if (place.id === placeID) {
            city.list.splice(index, 1);
          }
        });
      }
    });

    this.calculate();

    setTimeout(() => {

      this.animationState = 'center';
      this.showSpinner = false;
    }, 3000);


  }


  get isDraggble() {
    return (window.screen.width > 1150);
  }


  ngOnInit(): void {


    this.dbWorker.$ChangeNotifier.subscribe((x) => {
      if (x === 'true') {
        this.saveChanges();
      } else if (x === 'small') {

        this.parentAnimState = x;


      } else if (x === 'extraSmall') {
        this.parentAnimState = x;

      } else if (x === 'medium') {
        this.parentAnimState = x;

      } else if (x === 'big') {
        this.parentAnimState = x;

      } else if (x === 'center') {
        this.animationState = (this.animationState === 'center') ? 'mentr' : x;
      }
    });


    this.dbWorker.getCities().get().subscribe((data) => {
      this.data = data.data().cities;
      this.data.forEach((city, index) => {
        city.id = index.toString();
        city.list.forEach((place, plIndex) => {
          place.id = plIndex.toString();
        });
        city.plId = city.list.length.toString();
      });
      this.cityTmpId = this.data.length;
      this.calculate();

      this.animationState = 'center';

    });


  }

}



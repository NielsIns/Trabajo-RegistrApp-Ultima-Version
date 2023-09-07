import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from 'src/environments/environment.prod';

import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

describe('Pruebas unitarias home', () => {
  beforeEach( async ()=>{

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        IonicStorageModule.forRoot(),
        RouterModule,
        RouterTestingModule,
        HttpClientModule,
        
        
        
      ],

      providers:[Geolocation],

      declarations: [
        HomePage
      ]

    }).compileComponents();
  });

  it('1. Carga de la página home', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  })

});

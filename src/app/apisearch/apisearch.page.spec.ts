import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApisearchPage } from './apisearch.page';

describe('ApisearchPage', () => {
  let component: ApisearchPage;
  let fixture: ComponentFixture<ApisearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApisearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApisearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

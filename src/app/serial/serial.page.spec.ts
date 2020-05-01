import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SerialPage } from './serial.page';

describe('SerialPage', () => {
  let component: SerialPage;
  let fixture: ComponentFixture<SerialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SerialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsMenuPage } from './tabs-menu.page';

describe('TabsMenuPage', () => {
  let component: TabsMenuPage;
  let fixture: ComponentFixture<TabsMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

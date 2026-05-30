import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCatalog } from './header-catalog';

describe('HeaderCatalog', () => {
  let component: HeaderCatalog;
  let fixture: ComponentFixture<HeaderCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCatalog],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCatalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

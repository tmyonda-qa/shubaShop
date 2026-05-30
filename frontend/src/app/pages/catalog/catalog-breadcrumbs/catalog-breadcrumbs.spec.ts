import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogBreadcrumbs } from './catalog-breadcrumbs';

describe('CatalogBreadcrumbs', () => {
  let component: CatalogBreadcrumbs;
  let fixture: ComponentFixture<CatalogBreadcrumbs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogBreadcrumbs],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogBreadcrumbs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

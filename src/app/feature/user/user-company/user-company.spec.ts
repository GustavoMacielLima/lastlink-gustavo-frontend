import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompany } from './user-company';

describe('UserCompany', () => {
  let component: UserCompany;
  let fixture: ComponentFixture<UserCompany>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCompany]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCompany);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

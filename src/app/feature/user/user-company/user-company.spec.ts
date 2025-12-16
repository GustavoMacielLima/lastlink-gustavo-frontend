import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCompany } from './user-company';
import { CompanyResponse } from '../../../../service/user.service';

describe('UserCompany', () => {
  let component: UserCompany;
  let fixture: ComponentFixture<UserCompany>;

  const mockCompany: CompanyResponse = {
    name: 'Test Company',
    catchPhrase: 'Test catch phrase',
    bs: 'Test bs'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCompany]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCompany);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('company', mockCompany);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

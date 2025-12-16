import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAddress } from './user-address';
import { AddressResponse } from '../../../../service/user.service';

describe('UserAddress', () => {
  let component: UserAddress;
  let fixture: ComponentFixture<UserAddress>;

  const mockAddress: AddressResponse = {
    street: '123 Main St',
    suite: 'Apt 4',
    city: 'New York',
    zipcode: '10001',
    geo: {
      lat: '40.7128',
      lng: '-74.0060'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddress);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('address', mockAddress);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

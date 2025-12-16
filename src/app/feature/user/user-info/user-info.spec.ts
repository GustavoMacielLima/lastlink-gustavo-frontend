import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfo } from './user-info';
import { UserResponse } from '../../../../service/user.service';

describe('UserInfo', () => {
  let component: UserInfo;
  let fixture: ComponentFixture<UserInfo>;

  const mockUser: UserResponse = {
    id: 1,
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    phone: '123-456-7890',
    website: 'test.com',
    address: {
      street: '123 Main St',
      suite: 'Apt 4',
      city: 'New York',
      zipcode: '10001',
      geo: {
        lat: '40.7128',
        lng: '-74.0060'
      }
    },
    company: {
      name: 'Test Company',
      catchPhrase: 'Test catch phrase',
      bs: 'Test bs'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfo);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', mockUser);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

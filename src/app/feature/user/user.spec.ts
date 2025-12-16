import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { User } from './user';
import { UsersUtility } from '../../../utility/users.utility';
import { UserResponse } from '../../../service/user.service';

describe('User', () => {
  let component: User;
  let fixture: ComponentFixture<User>;
  let router: Router;
  let usersUtility: UsersUtility;

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
    const routerMock = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [User],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UsersUtility, useValue: { getUser: vi.fn().mockReturnValue(mockUser) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(User);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    usersUtility = TestBed.inject(UsersUtility);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

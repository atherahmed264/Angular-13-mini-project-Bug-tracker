import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { ViewComponentComponent } from './view-component.component';

describe('ViewComponentComponent', () => {
  let component: ViewComponentComponent;
  let fixture: ComponentFixture<ViewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComponentComponent ],
      imports : [
        AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render issue', () => {
    const fixture = TestBed.createComponent(ViewComponentComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')).toBeTruthy();
  });
});

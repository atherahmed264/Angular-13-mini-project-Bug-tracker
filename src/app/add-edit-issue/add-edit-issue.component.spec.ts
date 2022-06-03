import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { AddEditIssueComponent } from './add-edit-issue.component';

describe('AddEditIssueComponent', () => {
  let component: AddEditIssueComponent;
  let fixture: ComponentFixture<AddEditIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditIssueComponent ],
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
    fixture = TestBed.createComponent(AddEditIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render form', () => {
    const fixture = TestBed.createComponent(AddEditIssueComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  });
});

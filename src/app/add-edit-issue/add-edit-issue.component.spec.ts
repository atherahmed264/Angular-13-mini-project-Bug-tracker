import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditIssueComponent } from './add-edit-issue.component';

describe('AddEditIssueComponent', () => {
  let component: AddEditIssueComponent;
  let fixture: ComponentFixture<AddEditIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditIssueComponent ]
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
});

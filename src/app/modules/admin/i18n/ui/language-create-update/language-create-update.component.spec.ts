import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageCreateUpdateComponent } from './language-create-update.component';

describe('LanguageCreateUpdateComponent', () => {
  let component: LanguageCreateUpdateComponent;
  let fixture: ComponentFixture<LanguageCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageCreateUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageCreateUpdateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

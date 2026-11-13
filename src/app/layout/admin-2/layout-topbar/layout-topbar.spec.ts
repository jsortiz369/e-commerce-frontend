import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutTopbar } from './layout-topbar';

describe('LayoutTopbar', () => {
  let component: LayoutTopbar;
  let fixture: ComponentFixture<LayoutTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutTopbar],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutTopbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

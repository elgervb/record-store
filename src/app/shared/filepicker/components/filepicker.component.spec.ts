import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { FilepickerComponent } from './filepicker.component';

describe('FilepickerComponent', () => {
  let spectator: Spectator<FilepickerComponent>;
  const createComponent = createComponentFactory(FilepickerComponent);

  beforeEach(() => spectator = createComponent());


  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have html elements', () => {
    expect(spectator.query('.droparea')).toBeTruthy();
    expect(spectator.query('input[id=native-file-picker]')).toBeTruthy();
    expect(spectator.query('label[for=native-file-picker]')).toBeTruthy();
  });
});

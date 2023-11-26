import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'rst-progressbar',
  template: `
    <div class="progressbar"
      [class.progress--with-text]="showText"
      [class.progress--gt-50]="progress >= 50"
      [style.height.px]="height"
      [attr.data-progress]="progress">
      <div class="progressbar__inner" [style.width.%]="progress"></div>
    </div>
  `,
  styleUrls: [ './progressbar.component.scss' ]
})
export class ProgressbarComponent implements OnChanges {

  /**
   * Progress in percent
   */
  @Input() progress = 0;
  /**
   * Show the progress as text in the progress bar
   */
  @Input() showText = false;
  /**
   * The height of the bar
   */
  @Input() height = 10;

  /**
   * Angular lifecycle
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.progress) {
      this.progress = +changes.progress.currentValue;
    }
  }

}

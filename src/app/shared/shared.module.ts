import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilepickerComponent } from './filepicker/components/filepicker.component';
import { ProgressbarComponent } from './progress/progressbar/progressbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ FilepickerComponent, ProgressbarComponent ],
  exports: [ FilepickerComponent, ProgressbarComponent ],
  imports: [ CommonModule, MatProgressBarModule ]
})
export class SharedModule { }

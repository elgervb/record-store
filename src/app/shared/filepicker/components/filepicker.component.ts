import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FileProgress, UploadedFile } from './models';

@Component({
  selector: 'rst-filepicker',
  templateUrl: './filepicker.component.html',
  styleUrls: [ './filepicker.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilepickerComponent {

  /**
   * Be able to upload multiple files
   */
  @Input() multiple = false;

  @Output() readonly pick = new EventEmitter<UploadedFile>();

  @ViewChild('native') nativeFilePicker!: ElementRef<HTMLInputElement>;

  fileProgress = new Map<File, FileProgress>();

  files: UploadedFile[] = [];

  @HostBinding('class.dragover') dragover = false;

  constructor(private changeDetector: ChangeDetectorRef) {}

  @HostListener('dragover', [ '$event' ]) ondragover(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
    this.dragover = true;

    return false;
  }

  @HostListener('drop', [ '$event' ]) ondrop(event: DragEvent) {
    if(event.dataTransfer) {
      this.pickFiles(event.dataTransfer.files);
    }

    this.dragover = false;
    return false;
  }

  onChange() {
    const fileElement = this.nativeFilePicker.nativeElement;
    if (fileElement.files && fileElement.files.length > 0) {
      this.pickFiles(fileElement.files);
    }
  }

  deleteFile(file: UploadedFile): void {
    const index = this.files.indexOf(file);

    if (index !== -1) {
      this.files.splice(index, 1);
    }
  }

  getProgress() {
    let progress = 0;
    this.fileProgress.forEach(value => progress += value.progress);
    return Math.round(progress / this.fileProgress.size);
  }

  pickFiles(files: FileList) {
    // tslint:disable prefer-for-of
    for (let i = 0; i < files.length; i++) {
      // FIXME: extract validation functions
      // eslint-disable-next-line prefer-destructuring
      const file = files[i];
      if (!file.type.match('image.*')) {
        continue;
      }

      // update progress
      this.fileProgress.set(file, new FileProgress(file));

      const reader = new FileReader();
      reader.onload = this.handleFile.bind(this, file);
      reader.onprogress = this.handleProgress.bind(this, file);
      reader.onerror = event => this.handleError(file, event);
      reader.readAsDataURL(file);
    }
  }

  private handleError(file: File, event: ErrorEvent | ProgressEvent): void {
    //  FIXME:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = (event.target as any);
    switch (error.code) {
      case error.NOT_FOUND_ERR:
        throw new Error(`File ${file.name} could not be found`);
      // tslint:disable-next-line no-any
      case (error).NOT_READABLE_ERR:
        throw new Error(`File ${file.name} is not readable`);
      case error.ABORT_ERR:
        break; // noop
      default:
        throw new Error(`An error occurred reading file ${file.name}.`);
    }
  }

  private handleFile(file: File, event: Event) {
    // make sure to update progress to 100%
    const progress = this.fileProgress.get(file);
    progress?.update(file.size);

    const reader = event.target as FileReader;
    const pickedFile: UploadedFile = {
      file,
      content: reader.result as string
    };

    this.files.push(pickedFile);

    this.pick.emit(pickedFile);
  }

  private handleProgress(file: File, event: ProgressEvent) {
    if (event.lengthComputable) {
      const progress = this.fileProgress.get(file);
      progress?.update(event.loaded);

      this.changeDetector.markForCheck();
    }
  }

}

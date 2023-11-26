export interface UploadedFile {
  file: File;
  content: string;
}

export interface FilepickerOptions {
  mimeType: string;
  maxFiles: number;
  maxSize: number;
}

// tslint:disable no-magic-numbers
export class DefaultSettings implements FilepickerOptions {

  mimeType = 'image.*';
  maxFiles: 100;
  maxSize: 10000000; // 10MB

}

/**
 * Keeps track of the file read progress
 */
export class FileProgress {

  get progress() {
    return Math.round((this.bytesRead / this.file.size) * 100);
  }

  private bytesRead = 0;

  constructor(private file: File) { }

  update(read: number) {
    this.bytesRead = read;
  }


}

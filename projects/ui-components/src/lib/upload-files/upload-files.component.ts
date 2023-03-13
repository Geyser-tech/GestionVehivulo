import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagingService } from '@cad-core/services';

@Component({
  selector: 'cad-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  @Input() Multiple: boolean = false;
  @Input() Label: string;
  @Input() MaxFiles: number = 5;
  @Input() typeAccep: string;
  @Input() RegisteredFiles: any[] = [];

  @Input() IdFileUpdate: string = 'fileUploads';

  @Output() SendData = new EventEmitter<any>();
  @Output() SendDocument = new EventEmitter<any>();

  //Table
  selectedItem: any;
  selectedItems: any[];

  //Files
  registeredFilesModified: any[] = [];
  receivedFiles: any[] = [];
  files: any[] = [];
  file: any[] = [];
  fileBase64: any;
  filesBase64: any[] = [];
  preview: string;

  constructor(private sanitizer: DomSanitizer, private _msgService: MessagingService) {}
  ngAfterViewInit() {}

  ngOnInit(): void {
    if (this.RegisteredFiles?.length >= 1) {
      this.files = this.RegisteredFiles.map(file => {
        file.name = file.fileName;
        file.type = 'registered';
        return file;
      });
    }
  }
  ngOnChanges() {
    if (this.RegisteredFiles?.length >= 1) {
      this.files = this.RegisteredFiles.map(file => {
        file.name = file.fileName;
        file.type = 'registered';
        return file;
      });
    } else {
      this.files = [];
      this.filesBase64 = [];
    }
  }

  //Multiple
  btn_uploads() {
    const fileUploads = document.getElementById(this.IdFileUpdate) as HTMLInputElement;
    fileUploads.click();
  }
  fileUploads(event): any {
    event.preventDefault();

    const count = event.target.files.length;
    const filesActivos = this.files.filter(item => {
      if (item.stateFile != 'deleted') {
        return item;
      }
    });
    if (
      filesActivos.length > this.MaxFiles ||
      event.target.files.length > this.MaxFiles ||
      filesActivos.length + event.target.files.length > this.MaxFiles
    ) {
      this._msgService.error('Maximo ' + this.MaxFiles + ' archivos', 'Error!');
    } else {
      for (let i = 0; i <= count - 1; i++) {
        if (event.target.files[i].size > 2097152) {
          this._msgService.error('El tamaño del archivo ' + event.target.files[i].name + ' es mayor de 2MB', 'Error!');
        } else {
          this.converterBase64(event.target.files[i]).then((file: any) => {
            let fileBase64 = {
              file: file.base,
              fileName: event.target.files[i].name,
            };
            this.filesBase64.push(fileBase64);
            this.files.push(event.target.files[i]);
            let sendData = {
              newDocument: this.filesBase64,
              registeredDocument: this.RegisteredFiles.filter((item, index) => {
                if (item.stateFile == 'deleted') {
                  return item;
                }
              }),
            };
            this.SendData.emit(sendData);
          });
        }
      }
    }
  }

  deleteSelectedFiles() {
    this.receivedFiles = this.RegisteredFiles.filter(item => item.file);
    const documentsDelete = this.receivedFiles.filter(val => this.selectedItems.includes(val));
    this.receivedFiles = this.receivedFiles.filter(val => !this.selectedItems.includes(val));
    this.files = this.files.filter(val => !this.selectedItems.includes(val));

    documentsDelete.map(item => {
      item.stateFile = 'deleted';
      this.files.unshift(item);
    });

    this.filesBase64 = this.filesBase64.filter(val => {
      const filterItems = this.selectedItems.map(item => item.name);
      return !filterItems.includes(val.fileName);
    });
    let sendData = {
      newDocument: this.filesBase64,
      registeredDocument: this.files.filter(file => {
        if (file.file && file.stateFile == 'deleted') {
          return file;
        }
      }),
    };
    this.selectedItems = null;
    this.SendData.emit(sendData);
  }

  restoreFile(value: any) {
    this.files = this.files.filter(file => file.name != value.name);
    value.stateFile = 'active';
    this.files.unshift(value);
    let sendData = {
      newDocument: this.filesBase64,
      registeredDocument: this.files.filter(file => {
        if (file.file && file.stateFile == 'deleted') {
          return file;
        }
      }),
    };
    this.selectedItems = null;
    this.SendData.emit(sendData);
  }

  //Individual

  fileUpload(event): any {
    event.preventDefault();
    if (event.target.files[0].size > 2097152) {
      this._msgService.error('El tamaño del archivo ' + event.target.files[0].name + ' es mayor de 2MB', 'Error!');
    } else {
      this.converterBase64(event.target.files[0]).then((file: any) => {
        this.fileBase64 = {
          file: file.base,
          fileName: event.target.files[0].name,
        };
        this.SendData.emit(this.fileBase64);
      });
      this.file[0] = event.target.files[0];
    }
  }

  btn_upload() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }

  deleteSelectedFile() {
    this.file = [];
    this.selectedItem = null;
    this.fileBase64 = null;
    this.SendData.emit(this.fileBase64);
  }

  //Convertidor Base64
  converterBase64 = async (event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL(event);
        const reader = new FileReader();
        reader.readAsDataURL(event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = error => {
          resolve({
            base: error,
          });
        };
      } catch (error) {
        return error;
      }
    });
}

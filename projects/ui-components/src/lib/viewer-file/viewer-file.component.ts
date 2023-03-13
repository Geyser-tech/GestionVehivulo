import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cad-viewer-file',
  templateUrl: './viewer-file.component.html',
  styleUrls: ['./viewer-file.component.scss'],
})
export class ViewerFileComponent implements OnInit {
  @Input() Files: any;

  selectedItems: any[];
  constructor() {}

  ngOnInit(): void {}

  dowloadFiles(event) {
    event.preventDefault();
    for (var i = 0; i < this.selectedItems.length; i++) {
      window.open(this.selectedItems[i].file);
      setTimeout(function (path) {
        window.open(path);
      }, this.selectedItems[i].file);
    }
  }
}

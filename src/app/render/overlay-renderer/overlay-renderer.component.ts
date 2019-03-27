import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { OverlayMetadata } from '../../interface/overlay-metadata';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { fromEvent, timer } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-overlay-editor',
  templateUrl: './overlay-renderer.component.html',
  styleUrls: ['./overlay-renderer.component.css']
})
export class OverlayRendererComponent implements OnInit {

  @ViewChild(PdfViewerComponent) viewer: PdfViewerComponent;
  @ViewChild('container') container: ElementRef;

  src: string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  height = 'auto';

  private pdfRect: any = { height: 0 };

  overlays: OverlayMetadata[] = [
    {
      id: 'name',
      offsetX: 8,
      offsetY: 23,
      width: 23,
      height: 1.5
    }
  ];

  constructor() { }

  ngOnInit() {
    // monitor page-rendered event emitted from the viewer, but defer (debounce) the processing to only the 
    // last value in a series for performance
    this.viewer.pageRendered.pipe(debounceTime(500), map(e => e.detail))
      .subscribe(() => this.updateSize());
  }

  /**
   * Keep the dimension of the PDF and the overlay pane in sync
   */
  updateSize() {
    setTimeout(() => {
        this.pdfRect = this.viewer.element.nativeElement.getBoundingClientRect();
        this.height = this.pdfRect.height + 'px';
      });
  } 

}
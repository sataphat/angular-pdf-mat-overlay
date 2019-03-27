import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { OverlayRendererComponent } from './render/overlay-renderer/overlay-renderer.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports:      [ BrowserModule, FormsModule, PdfViewerModule ],
  declarations: [ AppComponent, HelloComponent, OverlayRendererComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

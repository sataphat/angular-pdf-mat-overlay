import { Injectable, ComponentFactoryResolver, Injector, NgZone, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Overlay, ScrollStrategyOptions, OverlayContainer, OverlayPositionBuilder, OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';

// Custom implementation for Overlay container
export class HsOverlayContainer extends OverlayContainer {

  // Add setter to _containerElement, so we can use any element as our container
  setContainerElement(el: HTMLElement) {
    this._containerElement = el;
  }

}

@Injectable({
  providedIn: 'root'
})
export class HsOverlayService extends Overlay {

  // Internal overlay container
  private overlayContainer: HsOverlayContainer;

  constructor(
    /** Scrolling strategies that can be used when creating an overlay. */
    scrollStrategies: ScrollStrategyOptions,
    componentFactoryResolver: ComponentFactoryResolver,
    positionBuilder: OverlayPositionBuilder,
    keyboardDispatcher: OverlayKeyboardDispatcher,
    injector: Injector,
    ngZone: NgZone,
    @Inject(DOCUMENT) document: any,
    directionality: Directionality,
    location?: Location | undefined) {

    // Use our own implementation of Overlay container instead of the default one by DI
    const container = new HsOverlayContainer(document);

    super(scrollStrategies,
      container, // <-- This one we can control
      componentFactoryResolver, positionBuilder, keyboardDispatcher, injector, ngZone, document, directionality, location);

    // Keep it inside the service
    this.overlayContainer = container;
  }

  // Provide service caller an ability to change the container at any time
  setContainerElement(el: HTMLElement) {
    this.overlayContainer.setContainerElement(el);
  }
}

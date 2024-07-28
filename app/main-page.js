// pages/main-page.js
import { Page, Image, Button } from '@nativescript/core';
//import { MainViewModel } from '../view-models/main-view-model';

export class MainPage extends Page {
    constructor() {
        super();
        //this.bindingContext = new MainViewModel();
    }

    createView() {
        const stack = new StackLayout();
        const startButton = new Button();
        startButton.text = "Take Picture";
        startButton.bind({ sourceProperty: 'start', targetProperty: 'tap' });

        const stopButton = new Button();
        stopButton.text = "Stop";
        stopButton.bind({ sourceProperty: 'stop', targetProperty: 'tap' });

        const image = new Image();
        image.bind({ sourceProperty: 'currentImage', targetProperty: 'src' });

        stack.addChild(startButton);
        stack.addChild(image);
        stack.addChild(stopButton);

        return stack;
    }
}

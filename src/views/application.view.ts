import { Application, Container } from "pixi.js";
import { Manifest } from "../models/manifest.model";

export default class ApplicationView {
  private MANIFEST: any = Manifest;
  private BG_COLOR: number = 0x333333;
  private BG_ALPHA: number = 1;
  private application: Application;
  public mainContainer: Container;

  constructor(
    private canvasParent: any,
    private BASE_WIDTH: number = 1000,
    private BASE_HEIGHT: number = 1000
  ) {
    this.application = new Application();
    this.application
      .init({
        width: BASE_WIDTH,
        height: BASE_HEIGHT,
        antialias: true,
        autoDensity: false,
        resolution: 1,
        roundPixels: true,
      })
      .then(() => {
        canvasParent.appendChild(this.application.canvas);
        // this.application.stage.addChild(this.mainContainer);

        const gt: any = globalThis;
        gt.__PIXI_APP__ = this.application;
      });
  }

  private initListeners(): void {
    window.onresize = () => {
      this.resize();
    };
    this.resize();
  }

  private resize(): void {
    // scale by parent width or height
    if (this.application.canvas.parentElement) {
      const canvasParentBoundingBox =
        this.application.canvas.parentElement.getBoundingClientRect();
      const scale: number = Math.min(
        canvasParentBoundingBox.width / this.BASE_WIDTH,
        canvasParentBoundingBox.height / this.BASE_HEIGHT
      );
      this.application.canvas.style.transform = `scale(${scale})`;
    }
  }
}

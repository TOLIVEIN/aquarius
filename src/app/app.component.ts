import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'aquarius';

  private app = document.getElementById('app-container');

  @ViewChild('app')
  appRef!: ElementRef;

  @ViewChild('backgroundCanvas')
  canvasRef!: ElementRef;

  canvasWidth = 0;
  canvasHeight = 0;

  coordinates = {} as Coordinates;
  letter = [] as Letter[];
  ctx = {} as CanvasRenderingContext2D;

  private letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*~`/.,<>?|]}{['.split(
    ''
  );

  public canvasClick = (event: MouseEvent) => {
    // console.log('canvas clicked', event);
    // const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    // ctx.fillStyle = '#fff';
    // // ctx.fillRect(event.x, event.y, 5, 5);
    // ctx.fillText('A', event.x, event.y, 5);
  }

  public mouseMove = (event: MouseEvent) => {
    // console.log(this.appRef.nativeElement.wi)
    this.canvasRef.nativeElement.width = this.appRef.nativeElement.clientWidth;
    this.canvasRef.nativeElement.height = this.appRef.nativeElement.clientHeight;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');


    // console.log(this.canvasRef);
    // console.log(event.x, event.y);
    [this.coordinates.x, this.coordinates.y] = [event.x, event.y];

    const oneLetter: Letter = {} as Letter;
    oneLetter.x = this.coordinates.x - 10 + this.randomNumber(20, 0);
    oneLetter.y = this.coordinates.y + this.randomNumber(20, 0);
    oneLetter.text = this.letters[this.randomNumber(this.letters.length, 0)];
    oneLetter.size = this.randomNumber(10, 8);
    oneLetter.shadowColor = 1;
    oneLetter.descendValue = this.randomNumber(6, 1);
    oneLetter.seven = this.randomNumber(20, 0);
    this.letter.push(oneLetter);

    this.fade();

    // console.log(this.letter);

    // // console.log(this.canvasRef);
    // // console.log(event);
    // this.ctx.fillStyle = '#ff0000';
    // this.ctx.font = '20px sans-serif';
    // // this.canvasRef.nativeElement.height = 500;
    // // this.canvasRef.nativeElement.width = 500;

    // // ctx.fillRect(event.x, event.y, 5, 5);
    // this.ctx.fillText(
    //   this.letters[
    //     Math.floor((Math.random() * event.x + event.y) % this.letters.length)
    //   ],
    //   event.x,
    //   event.y,
    //   50
    // );
  }

  /**
   * randomNumber
   */
  public randomNumber(n: number, i: number): number {
    return Math.floor(Math.random() * n) + i;
  }

  /**
   * drawText
   */
  public drawText(effectText: EffectText): void {
    this.ctx.save();
    this.ctx.font = effectText.size.toString() + 'px Lucida Console';
    this.ctx.shadowColor = `rgba(255,0,0,${effectText.shadowColor.toString()})`;
    this.ctx.shadowBlur = effectText.shadowColor / 2;
    this.ctx.fillStyle = `rgba(255,0,0,${effectText.shadowColor})`;
    const textWidth = this.ctx.measureText(effectText.text).width;
    this.ctx.fillText(
      effectText.text,
      effectText.x - textWidth / 2,
      effectText.y
    );
    this.ctx.restore();
  }

  /**
   * drawRectangle
   */
  public drawRectangle(canvasReacangle: EffectRectangle): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(
      canvasReacangle.x,
      canvasReacangle.y,
      canvasReacangle.width,
      canvasReacangle.height
    );
    this.ctx.fillStyle = canvasReacangle.color;
    this.ctx.fill();
    this.ctx.restore();
  }

  /**
   * fade
   */
  public fade(): void {

    // console.log('fading...');
    const show = this.randomNumber(2, 1);

    console.log(show);
    for (const item of this.letter) {
      if (show === 2) {
        if (this.letter) {
          item.text = this.letters[this.randomNumber(this.letters.length, 0)];
        }
      }
      if (this.letter) {
        item.y -= item.descendValue;
      }
      item.shadowColor >= 0 ? item.shadowColor -= 0.01 : this.letters.splice(this.letters.indexOf(item.text), 1);

      this.animate();
      // window.requestAnimationFrame(this.fade);
    }
  }

  /**
   * animate
   */
  public animate(): void {

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (const item of this.letter) {
      this.drawText(item);
      const rectangleHeight = this.randomNumber(540, 10);
      const shadowHeight = this.randomNumber(rectangleHeight, 1);
      if (item.descendValue === 2) {
        const animatedectangle = {} as EffectRectangle;
        animatedectangle.x = item.x;
        animatedectangle.y = item.y - shadowHeight;
        animatedectangle.width = item.size / 1.5;
        animatedectangle.height = rectangleHeight;
        animatedectangle.color = 'rgba(255, 0,0,0.05)';
        this.drawRectangle(animatedectangle);
      }
      const hintText = {} as EffectText;
      hintText.x = this.canvasWidth / 2;
      hintText.y = this.canvasHeight / 2;
      hintText.text = 'Move your mouse.';
      hintText.size = 28;
      hintText.shadowColor = 0.5;
      this.drawText(hintText);
    }
  }

  ngOnInit(): void {
    // console.log('app inited...');
    // this.canvasRef.nativeElement.width = this.app?.clientWidth;
    // this.canvasRef.nativeElement.height = this.app?.clientHeight;
    // console.log(this.canvasRef);
    // this.canvasRef.nativeElement.width = '100%';
    // this.canvasRef.nativeElement.height = '100%';
  }
}

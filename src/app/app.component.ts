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

  canvasWidth: number | undefined;
  canvasHeight: number | undefined;


  private letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*~`/.,<>?|]}{['.split(
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

    console.log(this.canvasRef);
    // console.log(event);
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext(
      '2d'
    );
    ctx.fillStyle = '#ff0000';
    ctx.font = '20px sans-serif';
    // ctx.fillRect(event.x, event.y, 5, 5);
    ctx.fillText(this.letters[Math.floor((Math.random() * event.x + event.y) % this.letters.length)], event.x, event.y, 50);
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

import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ConfigService } from './services/config.service';
import { UtilService } from './services/util.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild('app')
    appRef!: ElementRef;

    @ViewChild('backgroundCanvas')
    canvasRef!: ElementRef;

    title = 'aquarius';

    coordinates = {} as Coordinates;
    letter = [] as Letter[];
    ctx = {} as CanvasRenderingContext2D;

    color = '';

    private letters;
    constructor(
        private configService: ConfigService,
        private utilService: UtilService
    ) {
        this.letters = this.configService.letters.split('');
        this.utilService.themeColor$.subscribe((colorRGB) => {
            // console.log(color);
            this.color = colorRGB;
        });
    }

    public mouseMove(event: MouseEvent): void {
        [this.coordinates.x, this.coordinates.y] = [event.x, event.y];

        const oneLetter: Letter = {} as Letter;
        oneLetter.x = this.coordinates.x - 10 + this.randomNumber(20, 0);
        oneLetter.y = this.coordinates.y + this.randomNumber(20, 0);
        oneLetter.text = this.letters[
            this.randomNumber(this.letters.length, 0)
        ];
        oneLetter.size = this.randomNumber(20, 8);
        oneLetter.shadowColor = 1;
        oneLetter.descendValue = this.randomNumber(6, 1);
        oneLetter.seven = this.randomNumber(20, 0);
        this.letter.push(oneLetter);
    }

    public resize(): void {
        // console.log('resize...');
        // this.canvasRef.nativeElement.width = this.appRef.nativeElement.offsetWidth;
        // this.canvasRef.nativeElement.height = this.appRef.nativeElement.offsetHeight;

        this.canvasRef.nativeElement.width = window.innerWidth;
        this.canvasRef.nativeElement.height = window.innerHeight;
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
        this.ctx.font = `${effectText.size.toString()}px Lucida Console`;
        // this.ctx.shadowColor = `rgba(255,0,0,${effectText.shadowColor.toString()})`;
        this.ctx.shadowColor = `rgba(${
            this.color
        },${effectText.shadowColor.toString()})`;

        this.ctx.shadowBlur = effectText.shadowColor / 2;
        this.ctx.fillStyle = `rgba(${this.color},${effectText.shadowColor})`;
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
    public fade = () => {
        const show = this.randomNumber(2, 1);
        for (const item of this.letter) {
            if (show === 2) {
                if (this.letter) {
                    item.text = this.letters[
                        this.randomNumber(this.letters.length, 0)
                    ];
                }
            }
            if (this.letter) {
                item.y -= item.descendValue;
            }
            if (item.shadowColor >= 0) {
                item.shadowColor -= 0.01;
            } else {
                this.letter.splice(this.letters.indexOf(item.text), 1);
            }
            // item.shadowColor >= 0 ? (item.shadowColor -= 0.01) : this.letter.splice(this.letters.indexOf(item.text), 1);
        }

        this.animate();

        window.requestAnimationFrame(this.fade);
    };

    /**
     * animate
     */
    public animate(): void {
        // console.log('animate ...');
        this.ctx.clearRect(
            0,
            0,
            this.canvasRef.nativeElement.width,
            this.canvasRef.nativeElement.height
        );
        // console.log(this.letter);
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
                animatedectangle.color = `rgba(${this.color}, 0.05)`;
                this.drawRectangle(animatedectangle);
            }
        }
        const hintText = {} as EffectText;
        hintText.x = this.canvasRef.nativeElement.width / 2;
        hintText.y = this.canvasRef.nativeElement.height / 2;
        hintText.text = 'Aquarius.';
        hintText.size = 28;
        hintText.shadowColor = 0.5;
        this.drawText(hintText);
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        // this.canvasRef.nativeElement.width = this.appRef.nativeElement.offsetWidth;
        // this.canvasRef.nativeElement.height = this.appRef.nativeElement.offsetHeight;
        this.canvasRef.nativeElement.width = window.innerWidth;
        this.canvasRef.nativeElement.height = window.innerHeight;
        this.ctx = this.canvasRef.nativeElement.getContext('2d');

        this.fade();
    }
}

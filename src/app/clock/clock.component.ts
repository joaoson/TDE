import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  private seconds: number = 0;
  private decimalSeconds: number = 0;
  private minutes: number = 0;
  private decimalMinutes: number = 0;
  private hours: number = 0;
  private decimalHours: number = 0;

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    if (!this.ctx) {
      throw new Error('Unable to get 2D context for canvas');
    }

    this.initializeClock();
    setInterval(() => this.updateClock(), 1000);
  }

  private drawNumbers(number: number, positionX: number): void {
    this.ctx.font = "80px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(number.toString(), positionX, 330);
  }

  private drawMinutes(first: number, second: number): void {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(225, 250, 70, 100);
    this.ctx.fillRect(300, 250, 70, 100);

    this.drawNumbers(first, 235);
    this.drawNumbers(second, 310);
  }

  private drawSeconds(first: number, second: number): void {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(375, 250, 70, 100);
    this.ctx.fillRect(450, 250, 70, 100);

    this.drawNumbers(first, 385);
    this.drawNumbers(second, 460);
  }

  private initializeClock(): void {
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(50, 200, 500, 200);

    for (let i = 1; i <= 6; i++) {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(75 * i, 250, 70, 100);
      this.drawNumbers(0, 10 + (75 * i));
    }
  }

  private updateClock(): void {
    this.seconds++;
    if (this.seconds === 10) {
      this.seconds = 0;
      this.decimalSeconds++;
    }
    if (this.decimalSeconds === 6) {
      this.decimalSeconds = 0;
      this.minutes++;
    }
    if(this.minutes === 10){
      this.minutes = 0;
      this.decimalMinutes++;
    }
    if (this.decimalMinutes === 6) {
      this.decimalMinutes = 0;
      this.hours++;
    }
    if (this.decimalMinutes === 6) {
      this.decimalMinutes = 0;
      this.hours++;
    }
    this.drawSeconds(this.decimalSeconds, this.seconds);
    this.drawMinutes(this.decimalMinutes, this.minutes);
  }
}

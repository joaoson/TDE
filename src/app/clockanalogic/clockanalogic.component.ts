import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clockanalogic.component.html',
  styleUrls: ['./clockanalogic.component.css']
})
export class ClockanalogicComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  private minutesAngle: number = 0;
  private secondsAngle: number = 0;
  private secondsAngle2: number = 0;
  private minuteBegin: number = 0;
  private hoursAngle: number = 0;
  private hourBegin: number = 0;
  private minuteCounter: number = 0;

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    if (!this.ctx) {
      throw new Error('Unable to get 2D context for canvas');
    }

    this.drawClock();
    for (let i = 0; i < 12; i++) {
      this.drawMarkings(this.toRad(30 * i));
    }
    this.drawSecondHand(this.toRad(0));
    this.drawHourHand(0, 0);

    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  private toRad(angDeg: number): number {
    return angDeg * Math.PI / 180;
  }

  private drawClock(): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(300, 300);

    this.ctx.fillStyle = "#e5e4e2";
    this.ctx.arc(0, 0, 200, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }

  private drawMarkings(angle: number): void {
    this.ctx.save();
    this.ctx.translate(300, 300);

    this.ctx.strokeStyle = 'black';
    this.ctx.rotate(angle);
    this.ctx.translate(170, 0);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(20, 0);
    this.ctx.lineWidth = 10;
    this.ctx.stroke();
    this.ctx.restore();
  }

  private drawSecondHand(angle: number): void {
    this.ctx.save();
    this.ctx.translate(300, 300);

    this.ctx.strokeStyle = 'red';
    this.ctx.rotate(angle);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -170);
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    this.ctx.restore();
  }

  private drawMinuteHand(angle: number, beginningAngle: number): void {
    this.ctx.save();
    this.ctx.translate(300, 300);

    this.ctx.strokeStyle = 'black';
    this.ctx.rotate(beginningAngle);
    this.ctx.rotate(angle);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -160);
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.restore();
  }

  private drawHourHand(angle: number, beginningAngle: number): void {
    this.ctx.save();
    this.ctx.translate(300, 300);

    this.ctx.strokeStyle = 'black';
    this.ctx.rotate(beginningAngle);
    this.ctx.rotate(angle);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -180);
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = "blue";
    this.ctx.arc(0, -180, 5, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }

  private updateClock(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.drawClock();
    for (let i = 0; i < 12; i++) {
      this.drawMarkings(this.toRad(30 * i));
    }
    this.drawSecondHand(this.toRad(this.secondsAngle2));
    this.minutesAngle = this.secondsAngle / 60;
    this.hoursAngle = this.secondsAngle / 1440;
    this.hourBegin = this.minuteCounter / 2;
    this.drawMinuteHand(this.toRad(this.minutesAngle), this.toRad(this.minuteBegin));
    this.drawHourHand(this.toRad(this.hoursAngle), this.toRad(this.hourBegin));
    this.secondsAngle++;
    this.secondsAngle2 = this.secondsAngle *6
    console.log(this.secondsAngle)
    console.log(this.toRad(this.secondsAngle))
    if (this.secondsAngle2 == 360) {
      this.minuteBegin += 6;
      this.secondsAngle = 0;
      this.minuteCounter++;
    }
  }
}

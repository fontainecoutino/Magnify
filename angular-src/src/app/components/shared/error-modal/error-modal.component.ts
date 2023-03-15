import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
  @Input() error: string = "";

  constructor( private router: Router ){}

  async ngOnInit() {
    await this.sleep(5);
    this.router.navigate([ '/' ]);
  }

  async sleep(seconds: number){
    await new Promise(resolve => {
      return setTimeout(resolve, seconds * 1000);
  });
  }
}

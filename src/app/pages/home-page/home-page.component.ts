import { DataService } from '../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  inputValue:string;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  inputError() {
    if(this.inputValue) {
      if(this.inputValue.split('/').length > 2) {
        return true;
      }else {
        return false;
      }
    }
  }

  onSubmit() {
    let owner = this.inputValue.split('/')[0];
    let repoName = this.inputValue.split('/')[1];
    this.router.navigate(['/result'],  { queryParams: { owner, repoName }})
  }

}

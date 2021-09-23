import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  owner:string;
  repoName:string;
  data:any[];
  allDataLength:number;
  notFound:boolean;
  inputValue:string;
  page:number;
  perPage:number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.owner = res.owner;
      this.repoName = res.repoName;
      this.dataService.getAllData(this.owner, this.repoName).subscribe(res => {
        this.allDataLength = (res.body as any).length;
        this.data = (res.body as any).slice(0, 10)
        console.log(this.data);
        this.notFound = false;
      },
      (error) => {
        console.log(error.status);
        if(error.status == 404) {
          this.notFound = true;
        }
      })
    })
  }

  onSubmit() {
    this.owner = this.inputValue.split('/')[0];
    this.repoName = this.inputValue.split('/')[1];
    // this.page = 1;
    // this.perPage = 10;
    // this.dataService.getDataPerPage(this.owner, this.repoName, this.page, this.perPage).subscribe(res => {
    //   this.data = res.body as any
    //   this.notFound = false;
    // },
    // (error) => {
    //   console.log(error.status);
    //   if(error.status == 404) {
    //     this.notFound = true;
    //   }
    // })
    this.dataService.getAllData(this.owner, this.repoName).subscribe(res => {
      console.log(res.body);

      this.allDataLength = (res.body as any).length;
      this.data = (res.body as any).slice(0, 10)
      console.log(this.data);
      this.notFound = false;
    },
    (error) => {
      console.log(error.status);
      if(error.status == 404) {
        this.notFound = true;
      }
    })
  }

  inputError() {
    if(this.inputValue) {
      if(this.inputValue.split('/').length > 2) {
        return true;
      }else {
        return false;
      }
    }
  }

  onPageChange(event) {
    this.page = event.pageIndex+1;
    this.perPage = event.pageSize;
    this.dataService.getDataPerPage(this.owner, this.repoName, this.page, this.perPage).subscribe(res => {
      this.data = res.body as any;
      this.notFound = false;
    },
    (error) => {
      console.log(error.status);
      if(error.status == 404) {
        this.notFound = true;
      }
    })
  }

}

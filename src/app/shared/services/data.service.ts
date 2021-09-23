import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllData(owner:string, repoName:string) {
    return this.http.get(`https://api.github.com/repos/${owner}/${repoName}/forks`, {observe: 'response'});
  }

  getDataPerPage(owner:string, repoName:string, page, perPage) {
    return this.http.get(`https://api.github.com/repos/${owner}/${repoName}/forks?page=${page}&per_page=${perPage}`, {observe: 'response'});
  }

}

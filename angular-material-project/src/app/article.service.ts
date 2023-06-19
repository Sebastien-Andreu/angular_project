import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createArticle(title: string, content: string, publishDate: Date): Observable<void> {
    const newArticle = { title, content, publishDate };
    return this.http.post<void>(`${this.apiUrl}/articles`, newArticle);
  }
}

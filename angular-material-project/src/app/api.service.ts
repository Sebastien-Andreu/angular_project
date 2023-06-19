import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getComments(articleId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/articles/${articleId}/comments`);
  }

  addComment(articleId: string, comment: string): Observable<void> {
    const newComment = { text: comment };
    return this.http.post<void>(`${this.apiUrl}/articles/${articleId}/comments`, newComment);
  }
}

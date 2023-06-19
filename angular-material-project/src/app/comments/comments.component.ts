import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() articleId: string; // L'identifiant de l'article pour lequel les commentaires sont affichés

  comments: string[] = []; // Liste des commentaires récupérés de l'API
  commentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.commentForm = this.formBuilder.group({
      commentText: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.apiService.getComments(this.articleId)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  onSubmit() {
    if (this.commentForm.invalid) {
      return;
    }

    const commentText = this.commentForm.get('commentText')?.value;

    this.apiService.addComment(this.articleId, commentText)
      .subscribe(() => {
        this.comments.push(commentText);
        this.commentForm.reset();
      });
  }
}

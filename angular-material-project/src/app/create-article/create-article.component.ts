import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {
  articleForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      publishDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.articleForm.invalid) {
      return;
    }

    const title = this.articleForm.get('title')?.value;
    const content = this.articleForm.get('content')?.value;
    const publishDate = this.articleForm.get('publishDate')?.value;

    this.articleService.createArticle(title, content, publishDate)
      .subscribe(() => {
        console.log('Article created successfully');
        this.articleForm.reset();
      });
  }
}

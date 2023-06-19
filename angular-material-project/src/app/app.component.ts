import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeTab: string = 'home';
  isLoggedIn: boolean = false;
  selectedArticleId: string = ''; 

  changeTab(tab: string) {
    this.activeTab = tab;
  }

  login() {
    this.isLoggedIn = true;
    this.activeTab = 'home';
  }

  logout() {
    this.isLoggedIn = false;
    this.activeTab = 'home'; 
  }

  selectArticle(articleId: string) {
    this.selectedArticleId = articleId;
    this.activeTab = 'comments'; 
  }
}

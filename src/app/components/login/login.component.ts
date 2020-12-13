import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  token!: string;

  tags!: TagData;
  articles!: ArticleData;
  // loginForm: FormGroup;
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {}

  onSubmit(formData: FormGroup): void {
    this.login();
    this.authService.loginForm.reset();
    // console.log(formData)
  }

  login(): void {
    this.authService.getAuth().subscribe((res) => {
      // console.log(data);
      this.token = res.data.token;
      console.log(this.token);
    });

    // this.dataService.getTags().subscribe((tags) => {
    //   this.tags = tags.data;
    //   console.log(this.tags);
    // });
    // this.dataService.getArticles().subscribe((articles) => {
    //   this.articles = articles.data;
    //   console.log(this.articles);
    // });
  }

  get loginForm(): FormGroup {
    return this.authService.loginForm;
  }
}

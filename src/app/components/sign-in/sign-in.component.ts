import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less'],
})
export class SignInComponent implements OnInit {
  token!: string;

  tags!: TagData;
  articles!: ArticleData;
  // SignInForm: FormGroup;
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {}

  onSubmit(formData: FormGroup): void {
    this.signIn();
    this.authService.signInForm.reset();
    // console.log(formData)
  }

  signIn(): void {
    this.authService.getAuth().subscribe((res) => {
      // console.log(data);
      this.token = res.data.token;
      localStorage.setItem('token', this.token);
      console.log(localStorage);

      this.dataService.getUsers().subscribe(r => {
        console.log(r);
      });
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

  get signInForm(): FormGroup {
    return this.authService.signInForm;
  }
}

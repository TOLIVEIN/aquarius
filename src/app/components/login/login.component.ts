import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  token!: string;

  tags!: TagData;
  articles!: ArticleData;
  loginForm!: FormGroup;
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  ngOnInit(): void {
  }

  onSubmit(formData: FormGroup): void {
    this.login()
    this.loginForm.reset()
    // console.log(formData)
  }

  login(): void {
    this.dataService.getAuth().subscribe((data) => {
      // console.log(data);
      this.token = data.data.token;
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
}

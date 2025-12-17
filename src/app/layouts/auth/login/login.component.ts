import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async login() {
    this.loading = true;
    this.errorMessage = '';

    const { data, error } = await this.supabaseService.signIn(this.email, this.password);

    this.loading = false;

    if (error) {
      this.errorMessage = error.message;
      console.log(this.errorMessage);
    } else {
      this.router.navigate(['/project-dashboard']);
    }
  }
}

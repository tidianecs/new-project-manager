import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  loading = false;

  constructor(private supabase: SupabaseService, private router: Router) {}

  async register() {
    this.loading = true;

    const { error } = await this.supabase.signUp(this.email, this.password);

    this.loading = false;

    if (error) {
      alert(error.message);
      return;
    }

    alert("Compte créé ! Vérifiez votre email pour confirmer.");
    this.router.navigate(['/project-dashboard']);
  }
}

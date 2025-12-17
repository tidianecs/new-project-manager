import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {
  private supabase: any = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor() { }

  //Auth with supabase
  async signUp(email: string, password: string){
    return this.supabase.auth.signUp({email, password});
  }

  async signIn(email: string, password: string){
    return this.supabase.auth.signInWithPassword({email, password});
  }

  async signOut(email: string, password: string){
    return this.supabase.auth.signOut();
  }

  getSession(){
    return this.supabase.auth.getSession();
  }

  //Allow me to automatically see the changes of auth
  onAuthChange(callback: any) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  getUser(){
    return this.supabase.auth.getUser();
  }

  getClient() {
    return this.supabase;
  }

}

import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  //private client = this.supabaseService.getClient();

  constructor(private supabaseService: SupabaseService) {}

  async getProjects(user_id: string): Promise<Project[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('projects')
      .select('*')
      .eq('user_id', user_id)

    if (error) throw error
    return data as Project[]
  }

  async addProject(project: Project): Promise<Project> {
    const {data, error} = await this.supabaseService.getClient()
        .from('projects')
        .insert([project])
        .select();
    /*if(error){
        alert("Insertion Error: " + error.message)
    }else{
        alert("Insertion Successfull")
    }*/
    if (error) throw error
    console.log(data);
    return data as Project
  }

  async deleteProject(project_id: string): Promise<void> {
    const {data, error} = await this.supabaseService.getClient()
        .from('projects')
        .delete()
        .eq('id', project_id)
    if(error) throw error
  }

  /*
  async getProjectById(projectId: number): Promise<Project> {
    const {data, error} = await this.supabaseService.getClient()
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error) throw error
    console.log(data);
    return data as Project
  }*/
}

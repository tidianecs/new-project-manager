import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private supabaseService: SupabaseService) {}

  async getTasksByProject(projectId: string): Promise<Task[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Task[];
  }

  async addTask(task: Task): Promise<Task> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('tasks')
      .insert([task])
      .select()
      .single();

    if (error) throw error;
    return data as Task;
  }

  async updateTaskStatus(id: string, status: 'in-progress' | 'done'): Promise<void> {
    const { error } = await this.supabaseService
      .getClient()
      .from('tasks')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
  }

  async deleteTask(id: string): Promise<void> {
    const { error } = await this.supabaseService
      .getClient()
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

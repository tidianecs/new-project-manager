import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {

  projectId!: string;
  tasks: Task[] = [];
  newTaskTitle = '';
  loading = false;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) {}

  async ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;

    if (!this.projectId) {
      this.router.navigate(['/project-dashboard']);
      return;
    }

    await this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this.taskService.getTasksByProject(this.projectId);
  }

  async addTask() {
    if (!this.newTaskTitle.trim()) return;

    this.loading = true;

    const task: Task = {
      title: this.newTaskTitle,
      project_id: this.projectId,
      status: 'in-progress'
    };

    const createdTask = await this.taskService.addTask(task);

    this.tasks.unshift(createdTask);
    this.newTaskTitle = '';
    this.loading = false;
  }

  async toggleStatus(task: Task) {
    const newStatus = task.status === 'done' ? 'in-progress' : 'done';
    await this.taskService.updateTaskStatus(task.id!, newStatus);
    task.status = newStatus;
  }

  async deleteTask(id: string) {
    await this.taskService.deleteTask(id);
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  get inProgressTasks(): Task[] {
    return this.tasks.filter(t => t.status === 'in-progress');
  }

  get doneTasks(): Task[] {
    return this.tasks.filter(t => t.status === 'done');
  }

}

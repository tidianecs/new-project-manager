export interface Task {
  id?: string;      
  title: string;    
  status?: 'in-progress' | 'done';  
  project_id: string;         
  created_at?: string;        
}

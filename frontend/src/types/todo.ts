export interface Todo {
    id: number,
    title: string,
    description: string,
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED',
    priority: 'LOW' | 'MEDIUM' | 'HIGH',
    dueDate: Date,
    createdAt: string,
}
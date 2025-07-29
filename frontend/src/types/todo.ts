export interface Todo {
    id: number,
    title: string,
    description: string,
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED',
    dueDate: string,
}
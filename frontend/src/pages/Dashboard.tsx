import TodoList from "../components/TodoList.tsx";
import TodoDetails from "../components/TodoDetails.tsx";
import {useEffect, useState} from "react";
import {api} from "../api/axios.ts";
import type {Todo} from "../types/todo.ts";


export default function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get('/todos', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTodos(response.data);
                setSelectedTodo(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTodos();
    }, []);

    return (
        <div className="flex gap-20 justify-center">
            <div className="flex-1 max-w-md">
                <TodoList todos={todos} selectedTodo={selectedTodo} onSelect={setSelectedTodo}/>
            </div>
            <div className="flex-1 max-w-md">
                <TodoDetails todo={selectedTodo}/>
            </div>
        </div>
    );
}
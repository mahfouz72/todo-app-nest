import TodoList from "../components/TodoList.tsx";
import TodoDetails from "../components/TodoDetails.tsx";
import {useEffect, useState} from "react";
import {api} from "../api/axios.ts";
import type {Todo} from "../types/todo.ts";
import TodoFilters from "../components/TodoFilters.tsx";
import type {sortBy, sortKey} from "../types/sort.ts";
import type {filter} from "../types/filter.ts";


export default function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>();

    useEffect(() => {
        fetchTodos();  // normal fetch
    }, []);


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

    const appendTodo = (todo: Todo) => {
        setTodos(prev => [...prev, todo]);
    }

    const deleteTodo = (id: number) => {
        setTodos(prev => {
            const updatedTodos = prev.filter(todo => todo.id !== id);

            if (selectedTodo?.id === id) {
                setSelectedTodo(updatedTodos[0] ?? null);
            }

            return updatedTodos;
        });
    }

    const editTodo = (id: number, updatedTodo: Todo) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id === id) {
                return updatedTodo;
            }
            return todo;
        }));

        if (selectedTodo?.id === id) {
            setSelectedTodo(updatedTodo);
        }
    }

    const handleSearch = async (searchKey: string) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get(`/todos/search?searchKey=${encodeURIComponent(searchKey)}`, {
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

    const handleSort = async (sortBy: sortBy, sortKey: sortKey) => {
        try {
            const token = localStorage.getItem("token");
            const response =
                await api.get(`/todos/sort?sortBy=${sortBy}&sortKey=${encodeURIComponent(sortKey)}`, {
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

    const handleFilter = async (filter: filter) => {
        try {
            const token = localStorage.getItem("token");
            const params = new URLSearchParams();


            if (filter.status) {
                params.append("status", filter.status);
            }

            if (filter.priority) {
                params.append("priority", filter.priority);
            }

            const queryString = params.toString();
            const url = queryString ? `/todos/filter?${queryString}` : `/todos`;

            const response =
                await api.get(url, {
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

    return (
        <div className="flex gap-20 justify-center">
            <div className="max-w-md">
                <TodoFilters onSearch={handleSearch} onSort={handleSort} onFilter={handleFilter}/>
            </div>
            <div className="flex-1 max-w-md">
                <TodoList todos={todos} selectedTodo={selectedTodo}
                          onSelect={setSelectedTodo}
                          onCreate={appendTodo}
                          onDelete={deleteTodo}
                />
            </div>
            <div className="flex-1 max-w-md">
                <TodoDetails todo={selectedTodo} onUpdate={editTodo}/>
            </div>
        </div>
    );
}
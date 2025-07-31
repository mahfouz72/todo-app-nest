import type {Todo} from "../types/todo.ts";
import CreateTodoModal from "./CreateTodoModal.tsx";
import {useState} from "react";
import {FaTrash} from "react-icons/fa";
import {api} from "../api/axios.ts";

type TodoListProps = {
    todos: Todo[],
    selectedTodo: Todo | null | undefined,
    onSelect: (todo: Todo) => void,
    onCreate: (todo: Todo) => void,
    onDelete: (id: number) => void,
    onUpdate: (id: number, updatedTodo: Todo) => void,
}

export default function TodoList({todos, selectedTodo, onSelect, onCreate, onDelete, onUpdate}: TodoListProps) {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const handleDelete = async (id: number) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.delete(`/todos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const todo: Todo = response.data;
            onDelete(todo.id);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCompleted= async (todo: Todo) => {
        try {
            const updatedTodo = {
                ...todo,
                status: (todo.status === 'COMPLETED') ? 'IN_PROGRESS' : 'COMPLETED'
            };
            const token = localStorage.getItem("token");
            const response = await api.put(`/todos/${updatedTodo?.id}`, updatedTodo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const todoResponse: Todo = response.data;
            onUpdate(todoResponse.id, todoResponse);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="max-w-md mt-15 p-4 rounded-xl bg-white shadow-md h-128 flex flex-col justify-between">
                <ul className="pl-5 space-y-3 overflow-y-auto">
                    {todos.map((todo) => (
                        <li key={todo.id} className="flex flex-row gap-2">
                            <input type="checkbox" className="cursor-pointer"
                                   onChange={() => handleCompleted(todo)}
                                   checked={todo.status === 'COMPLETED'}
                            />
                            <div
                                className={`cursor-pointer p-2 rounded flex-1
                                        ${selectedTodo?.id === todo.id ? 'bg-blue-100' : 'hover:bg-gray-100'}
                                        ${todo.status === 'COMPLETED' ? 'line-through text-gray-400' : ''}
                                `}
                                onClick={() => onSelect(todo)}
                            >
                                {todo.title}
                            </div>
                            <button
                                className="text-red-500 hover:text-red-700 font-bold"
                                onClick={() => handleDelete(todo.id)}
                            >
                                <FaTrash/>
                            </button>
                        </li>
                    ))}
                </ul>
                <button className="py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={() => setModal(true)}>
                    Add Todo
                </button>
            </div>
            <CreateTodoModal toggle={toggle} modal={modal} onCreate={onCreate} />
        </>
    )
}
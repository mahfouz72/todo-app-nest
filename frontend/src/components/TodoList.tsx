import type {Todo} from "../types/todo.ts";

type TodoListProps = {
    todos: Todo[],
    selectedTodo: Todo | null | undefined,
    onSelect: (todo: Todo) => void,
}

export default function TodoList({todos, selectedTodo, onSelect}: TodoListProps) {
    return (
        <div
            className="max-w-md mt-15 p-4 rounded-xl bg-white shadow-md h-128 flex flex-col justify-between">
            <ul className="pl-5 space-y-3 overflow-y-auto">
                {todos.map((todo) => (
                    <li key={todo.id} className="flex flex-row gap-2">
                        <input type="checkbox" className="cursor-pointer"/>
                        <div
                            className={`cursor-pointer p-2 rounded flex-1 ${
                                selectedTodo?.id === todo.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                            onClick={() => onSelect(todo)}
                        >
                            {todo.title}
                        </div>
                    </li>
                ))}
            </ul>
            <button className="py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Add Todo
            </button>
        </div>
    )
}
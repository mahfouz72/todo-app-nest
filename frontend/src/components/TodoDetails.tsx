import type {Todo} from "../types/todo.ts";

type TodoDetailsProps = {
    todo: Todo | null | undefined,
}

export default function TodoDetails({todo} : TodoDetailsProps) {
    return (
        <div className="max-w-md h-128 mt-15 p-4 bg-white rounded-xl shadow-md space-y-4">
            <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="text-lg text-gray-900">{todo?.title}</p>
            </div>

            <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-base text-gray-800">
                    {todo?.description}
                </p>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-base font-medium text-yellow-600">{todo?.status}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className="text-base text-gray-800">{todo?.dueDate}</p>
                </div>
            </div>
        </div>
    );
}
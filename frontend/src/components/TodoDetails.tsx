import type {Todo} from "../types/todo.ts";

type TodoDetailsProps = {
    todo: Todo | null | undefined,
}

export default function TodoDetails({todo}: TodoDetailsProps) {
    function getStatusColor(status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | undefined) {
        if (status === "PENDING") {
            return "text-yellow-600"
        } else if (status === "IN_PROGRESS") {
            return "text-blue-600";
        }
        else if (status === "COMPLETED") {
            return "text-green-600"
        }
        else {
            return "text-gray-600";
        }
    }

    function getPriorityColor(priority: "LOW" | "MEDIUM" | "HIGH" | undefined) {
        if (priority === "LOW") {
            return "text-green-600"
        } else if (priority === "MEDIUM") {
            return "text-blue-600";
        }
        else if (priority === "HIGH") {
            return "text-yellow-600"
        }
        else {
            return "text-red-600";
        }
    }

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
                    <p className={`text-base font-medium ${getStatusColor(todo?.status)}`}>
                        {todo?.status}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <p className={`text-base font-medium  ${getPriorityColor(todo?.priority)}`}>
                        {todo?.priority}
                    </p>
                </div>
            </div>
            <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="text-base text-gray-800">{todo?.dueDate}</p>
            </div>
        </div>
    );
}
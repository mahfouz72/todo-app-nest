import type {Todo} from "../types/todo.ts";
import {z} from "zod";
import {type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {api} from "../api/axios.ts";

type createTodoProps = {
    todo: Todo | null | undefined,
    modal: boolean,
    toggle: () => void,
    onUpdate: (TodoId: number, todo: Todo) => void,
}

const schema = z.object({
    title: z.string().nonempty({message: "Title is required"}),
    description: z.string(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    dueDate: z.date(),
})

type formFields = z.infer<typeof schema>;

export default function EditTodoModal({todo, modal, toggle, onUpdate}: createTodoProps) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<formFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: todo?.title,
            description: todo?.description,
            status: todo?.status,
            priority: todo?.priority,
            dueDate: todo?.dueDate ? new Date(todo.dueDate) : new Date(),
        }
    });

    useEffect(() => {
        import('bootstrap/dist/css/bootstrap.min.css');
    }, []);

    useEffect(() => {
        reset({
            title: todo?.title,
            description: todo?.description,
            status: todo?.status,
            priority: todo?.priority,
            dueDate: todo?.dueDate ? new Date(todo.dueDate) : new Date(),
        });
    }, [todo, reset]);

    const onSubmitHandler: SubmitHandler<formFields> = async (data) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.put(`/todos/${todo?.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            const todoResponse: Todo = response.data;
            onUpdate(todoResponse.id, todoResponse);
            toggle();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Todo</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        {/* title */}
                        <div>
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("title")}
                            />
                            {errors.title && (
                                <div className="text-danger text-sm">{errors.title.message}</div>
                            )}
                        </div>


                        {/* description */}
                        <div>
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                {...register("description")}
                            />
                            {errors.description && (
                                <div className="text-danger text-sm">{errors.description.message}</div>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="form-label">Status</label>
                            <select className="form-control" {...register("status")}>
                                <option value="PENDING">PENDING</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>
                            {errors.status && (
                                <div className="text-danger text-sm">{errors.status.message}</div>
                            )}
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="form-label">Priority</label>
                            <select className="form-control"  {...register("priority")}>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </select>
                            {errors.priority && (
                                <div className="text-danger text-sm">{errors.priority.message}</div>
                            )}
                        </div>

                        {/* Due date */}
                        <div>
                            <label className="form-label">Due Date</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                {...register("dueDate", {
                                    valueAsDate: true,
                                })}
                            />
                            {errors.dueDate && (
                                <div className="text-danger text-sm">{errors.dueDate.message}</div>
                            )}
                        </div>

                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit(onSubmitHandler)}>
                        Update
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>

                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
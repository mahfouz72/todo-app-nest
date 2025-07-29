import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {api} from "../api/axios.ts";
import {useEffect} from "react";
import type {Todo} from "../types/todo.ts";

type createTodoProps = {
    modal: boolean;
    toggle: () => void;
    onCreate: (todo: Todo) => void;
}

const schema = z.object({
    title: z.string().nonempty({message: "Title is required"}),
    description: z.string(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    dueDate: z.date(),
})

type formFields = z.infer<typeof schema>;

export default function CreateTodo({modal, toggle, onCreate}: createTodoProps) {
    const {register, handleSubmit, formState: {errors}} = useForm<formFields>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        import('bootstrap/dist/css/bootstrap.min.css');
    }, []);


    const onSubmitHandler: SubmitHandler<formFields> = async (data) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post('/todos', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onCreate(response.data);
        } catch (error) {
            console.log(error);
        }
        toggle();
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create Todo</ModalHeader>
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
                        Create
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>

                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
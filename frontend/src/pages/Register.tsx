import {type SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {Link} from "react-router-dom";
import {api} from "../api/axios.ts";
import axios from "axios";


const schema = z.object({
    username: z.string().nonempty({message: "Username is required"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
});

type formFields = z.infer<typeof schema>;

export default function Register() {
    const {register, handleSubmit, setError, formState: {errors}} = useForm<formFields>({
        resolver: zodResolver(schema),
    });

    const onSubmitHandler: SubmitHandler<formFields> = async (data) => {
        try {
            const response = await api.post('/register', data);
            console.log(response.data);
        }
        catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    setError("username", {message:"Username already exists"});
                }
                else {
                    console.error(error.response?.data.message);
                }
            }
            else {
                console.error(error);
            }
        }
    }

    return (
        <form className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4"
              onSubmit={handleSubmit(onSubmitHandler)}>
            <input
                {...register("username")}
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <div className="text-red-500 mb-3">{errors.username.message}</div>}
            <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <div className="text-red-500 mb-3">{errors.password.message}</div>}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
                Register
            </button>
            <Link
                to="/"
                className="block text-center text-blue-600 mt-2 hover:underline"
            >
                Already have an account? Login
            </Link>
        </form>
    );
}

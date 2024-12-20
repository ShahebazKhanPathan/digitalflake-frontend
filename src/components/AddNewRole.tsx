import apiClient from '../services/apiClient';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

interface Role {
    id: String,
    name: String,
    status: String,
}

const AddNewRole = () => {

    const { register, handleSubmit, reset } = useForm<Role>();

    const onSubmit = async (data: Role) => {
        apiClient.post("/roles", data, { headers: {"auth-admin": localStorage.getItem("auth-admin")}})
            .then(() => {
                reset();
                alert("Role added successfully!");
            })
            .catch((err) => console.log(err));
    };

    

    return (
        <div className="grid grid-rows-2">
            <div className="grid grid-cols-12 flex items-center p-5">
                <div className="col-span-12 rows-span-1 mb-2 flex items-center space-x-2">
                    <Link to={"/dashboard/roles"}>
                        <ArrowBackIcon />
                    </Link>
                    <h3 className="font-bold"> Add Role</h3>
                </div>
                <div className="col-span-8 row-span-1">
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-2">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-400">
                                Role Name
                            </label>
                            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-400">
                                Status
                            </label>
                            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                <select
                                    {...register("status", { required: true })}
                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                >
                                    <option value="Active">Active</option>
                                    <option value="InActive">InActive</option>
                                </select>
                            </div>
                        </div>
                    <div className="absolute bottom-4 right-4 flex space-x-4 p-2">
                        <button type='submit' className="w-24 bg-fuchsia-950 rounded-full text-white p-2">Save</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewRole;
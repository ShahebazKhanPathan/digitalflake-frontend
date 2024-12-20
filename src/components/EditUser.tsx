import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import apiClient from '../services/apiClient';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface User {
    _id: string;
    name: string;
    mobile: string;
    email: string;
    role: string;
    photo: FileList;
}

interface Role {
    _id: string,
    name: string,
    status: string,
}

const EditUser = () => {
    const { register, handleSubmit } = useForm<User>();
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const [params] = useSearchParams();

    const getUser = () => {
        apiClient.get(`/user/${params.get("id")}`)
            .then(({ data }) => {
                setUser(data.data);
                setRoles(data.data.roles || []);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const getRoles = () => {
        apiClient.get("/roles")
            .then(({ data }) => {
                console.log(data.data);
                setRoles(data.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    const onSubmit = async (data: User) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        formData.append("role", data.role);
        formData.append('photo', data.photo[0]);

        try {
            await apiClient.put(`/user/${params.get("id")}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-admin': localStorage.getItem('auth-admin'),
                },
            });
            getUser();
            alert('User edited successfully!');
        } catch (err) {
            console.error(err);
            alert('Error updating user details');
        }
    };

    useEffect(() => {
        getUser();
        getRoles();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-rows-3">
            <div className="grid grid-cols-12 row-span-1 flex items-center p-5">
                <div className="col-span-12 rows-span-1 mb-2 flex items-center space-x-2">
                    <Link to="/dashboard/users">
                        <ArrowBackIcon />
                    </Link>
                    <h3 className="font-bold">Edit User</h3>
                </div>
                <div className="col-span-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-span-4 gap-x-4 row-span-1">
                            <div className="mt-2">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-400">
                                    User Name
                                </label>
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300">
                                    <input
                                        {...register("name", { required: true })}
                                        defaultValue={user.name}
                                        type="text"
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-4 gap-x-4 row-span-1">
                            <div className="mt-2">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-400">
                                    Email Id
                                </label>
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300">
                                    <input
                                        {...register("email", { required: true })}
                                        defaultValue={user.email}
                                        type="text"
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-4 row-span-1">
                            <div className="mt-2">
                                <label htmlFor="mobile" className="block text-sm/6 font-medium text-gray-400">
                                    Mobile
                                </label>
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300">
                                    <input
                                        {...register("mobile", { required: true })}
                                        defaultValue={user.mobile}
                                        type="text"
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-4 row-span-1">
                            <div className="mt-2">
                                <label htmlFor="role" className="block text-sm/6 font-medium text-gray-400">
                                    Role
                                </label>
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300">
                                    <select
                                        {...register("role", { required: true })}
                                        defaultValue={user.role}
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    >
                                        {roles.map((role) => (
                                            <option key={role._id} value={role.name}>{role.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-4 row-span-1">
                            <div className="mt-2">
                                <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-400">
                                    Upload Image
                                </label>
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300">
                                    <input
                                        {...register("photo")}
                                        type="file"
                                        accept="image/*"
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-4 right-4 flex space-x-4 p-2">
                            <button type="submit" className="w-24 bg-fuchsia-950 rounded-full text-white p-2">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;

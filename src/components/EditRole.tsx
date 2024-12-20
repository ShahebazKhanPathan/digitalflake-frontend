import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';  // Corrected the import for Link
import { useForm } from 'react-hook-form';
import apiClient from '../services/apiClient';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Role {
    _id: string,
    name: string,
    status: string,
}

const EditRole = () => {
    const { register, handleSubmit } = useForm<Role>();
    const [role, setRole] = useState<Role>();
    const [params] = useSearchParams();

    const getRole = () => {
        apiClient.get("/roles")
            .then(({ data }) => {
                console.log(data.data[0]);
                setRole(data.data[0]);
            }).catch((err) => {
                console.log(err);
            })
    }

    const onSubmit = async (data: Role) => {
        try {
            await apiClient.put(`/role/${params.get("id")}`, data, {
                headers: {
                    'auth-admin': localStorage.getItem('auth-admin'),
                },
            });
            getRole();
            alert('Role edited successfully!');
        } catch (err) {
            console.error(err);
            alert('Error updating user details');
        }
    };

    useEffect(() => {
        getRole();
    }, []);

    if (!role) {
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
                                    Role
                                </label>
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300">
                                    <input
                                        {...register("name", { required: true })}
                                        defaultValue={role.name}
                                        type="text"
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

export default EditRole;

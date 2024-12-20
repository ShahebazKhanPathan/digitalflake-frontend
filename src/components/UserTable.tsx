import apiClient from "../services/apiClient";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface User {
    _id: String,
    name: String,
    mobile: String,
    email: String,
    role: String,
    photo: FileList
}

const UserTable = () => {

    const [users, setUsers] = useState<User[]>([]);

    const deleteUser = (id: String) => {
        apiClient.delete("/user/" + id)
            .then(() => {
                alert("User removed successfully!");
                getUsers();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const editUser = (id: String) => {
        location.href = "/dashboard/edit-user?id=" + id;
    }

    const getUsers = () => {
        apiClient.get("/user")
            .then(({ data }) => {
                console.log(data.data);
                setUsers(data.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <table width={"100%"} className="border-separate border-spacing-y-2">
            <tr className="bg-yellow-100 text-center">
                <th className="p-4">Name</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
            </tr>
            {users.map((user) =>
                <tr className="bg-stone-100 text-center" key={user._id}>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.mobile}</td>
                    <td className="p-4">{user.role}</td>
                    <td className="p-4">
                        <div className="flex gap-4 justify-center items-center">
                            <button
                                className="border p-2 rounded bg-blue-500 text-white"
                                onClick={() => editUser(user._id)}
                            >
                                <EditIcon />
                            </button>
                            <button
                                onClick={() => deleteUser(user._id)}
                                className="border p-2 rounded bg-red-500 text-white"
                            >
                                <DeleteIcon />
                            </button>
                        </div>
                    </td>
                </tr>
            )}
        </table>
    )
}

export default UserTable;
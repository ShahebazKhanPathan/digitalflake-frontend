import apiClient from "../services/apiClient";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Role {
  _id: String,
  name: String,
  status: String,
}

const RolesTable = () => {

  const [roles, setRoles] = useState<Role[]>([]);

  const deleteRole = (id: String) => {
    apiClient.delete("/roles/" + id)
      .then(() => {
        alert("Role removed successfully!");
        getRoles();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const editRole = (id: String) => {
    location.href = "/dashboard/edit-role?id=" + id;
  }

  const getRoles = () => {
    apiClient.get("/roles")
      .then(({ data }) => {
        console.log(data.data);
        setRoles(data.data);
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <table width={"100%"} className="border-separate border-spacing-y-2">
      <tr className="bg-yellow-100 text-center">
        <th className="p-4">Role Name</th>
        <th className="p-4">Status</th>
        <th className="p-4">Action</th>
      </tr>
      {roles.map((role) =>
        <tr className="bg-stone-100 text-center" key={role._id}>
          <td className="p-4">{role.name}</td>
          <td className="p-4">{role.status}</td>
          <td className="p-4">
            <div className="flex gap-4 justify-center items-center">
              <button
                onClick={() => editRole(role._id)}
                className="border p-2 rounded bg-blue-500 text-white">
                <EditIcon />
              </button>
              <button
                onClick={() => deleteRole(role._id)}
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

export default RolesTable;
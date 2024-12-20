import { Link } from "react-router";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import UserTable from "./UserTable";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Users = () => {
    return (
        <div className="grid grid-rows-1">
            <div className="grid grid-cols-12 flex items-center p-5">
                <div className="col-span-3">
                    <div className="flex gap-2">
                        <AccountCircleOutlinedIcon/>
                        <h3 className="font-bold"> Users</h3>
                    </div>
                </div>
                <div className="col-span-6">
                    <div>
                        <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                <SearchOutlinedIcon/>
                                <input
                                    id="price"
                                    name="price"
                                    type="text"
                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-2">
                    <Link to={"/dashboard/add-user"}>
                        <button className="p-2 bg-fuchsia-950 text-white rounded-lg w-full">Add new</button>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-12 ">
                <div className="col-span-12">
                    <UserTable />
                </div>
            </div>
        </div>
    )
}

export default Users;
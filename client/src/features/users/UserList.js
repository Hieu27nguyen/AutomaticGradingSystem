import { useGetUsersQuery } from "./usersApiSlice";
import User from './User';
import '../../style/UserList.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";



const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();

    const navigate = useNavigate();

    const [count, setCount] = useState(0)

    useEffect(() => {
        if (isSuccess && users) {
            const { ids } = users;
            let contestUserCount = 0;

            ids?.forEach(userId => {
                const user = users.entities[userId];
                if (user && user.roles.toString().toLowerCase().replaceAll(',', ', ').includes('contestant') ){
                    contestUserCount++;
                }
            });

            setCount(contestUserCount);
        }
    }, [isSuccess, users]);


    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids } = users;

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null;


        content = (
            <div>
                <div className="header">
                    <div className="titles">
                        <h2>Manage Contestants</h2>
                        <h4>{count} Total</h4>
                    </div>

                    <button className="add_button" onClick={() => navigate("/newuser")}><i className="bi-person-plus-fill"></i>Add User</button>
                </div>

                <div className="body">

                    <div className="table-titles">
                        <h3>Username</h3>
                        <h3>Role</h3>
                    </div>         
                    {tableContent}
                      
                    
                </div>



            </div>
        );
    }

    return content;
};

export default UsersList;

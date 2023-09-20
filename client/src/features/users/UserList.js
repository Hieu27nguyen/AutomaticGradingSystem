import { useGetUsersQuery } from "./usersApiSlice";
import User from './User';
import '../../style/UserList.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDeleteUserMutation } from "./usersApiSlice";


const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();



    const navigate = useNavigate();
    const [deleteUser] = useDeleteUserMutation();
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
    const [contestants, setContestants] = useState([]);

    
    
    useEffect(() => {
        if (isSuccess && users) {
            const { ids, entities } = users;
            const contestants = ids
                .map(userId => entities[userId])
                .filter(user => user && user.roles.toString().toLowerCase().replaceAll(',', ', ').includes('contestant')
                );
            setContestants(contestants);
        }
        
    }, [isSuccess, users]);

    useEffect(() => {
        
        const areAllContestantsSelected = contestants.every(
          (contestant) => selectedCheckboxes[contestant.id]
        );
    
        // Update the "Check All" button state
        setIsCheckedAll(areAllContestantsSelected);
      }, [selectedCheckboxes, contestants]);
    const handleCheckAll = () => {
        const updatedCheckboxes = {};
        const areAllChecked = !isCheckedAll;
      
        contestants.forEach(contestant => {
          updatedCheckboxes[contestant.id] = areAllChecked;
        });
        setSelectedCheckboxes(updatedCheckboxes);
        setIsCheckedAll(!isCheckedAll);
      };

    const handleDeleteAll = () => {
            contestants.forEach(contestant => {
                if ( selectedCheckboxes[contestant.id] === true) {
                    deleteUser({ id: contestant.id })
                }
            });
        }


    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids } = users;

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId}
                userId={userId}
                isChecked={selectedCheckboxes[userId] || false}
                setIsChecked={(newState) => {
                    const updatedSelectedCheckboxes = { ...selectedCheckboxes };
                    updatedSelectedCheckboxes[userId] = newState;
                    setSelectedCheckboxes(updatedSelectedCheckboxes);
                }}
            />)
            : null;


        content = (
            <div>
                <div className="header">
                    <div className="titles">
                        <h2>Manage Contestants</h2>
                        <h4>{contestants.length} Total</h4>
                    </div>

                    <button className="add_button" onClick={() => navigate("/newuser")}><i className="bi-person-plus-fill"></i>Add User</button>
                </div>

                <div className="body">
                    {contestants.length > 0 ? (
                        <div >
                            <div className="check-and-titles">

                                <div className="check-all">
                                    <input type="checkbox" aria-label="Select All Users" checked={isCheckedAll} onChange={handleCheckAll} ></input>
                                </div>
                                <div className="table-titles">
                                    <div className="user-info">
                                        <h3 className="user">Username</h3>
                                        <h3 >Role</h3>
                                    </div>
                                    <div className='user-action'>
                                        {/*Ignore this edit-button */}
                                        <button className='edit-button' disabled style={{ color: 'transparent', backgroundColor: 'transparent', border: 'none', cursor: 'default' }}><i class="bi bi-pencil-fill"></i></button>
                                        {/*Ignore this edit-button */}
                                        
                                        <button className={`delete-button ${selectedCheckboxes}`} onClick={handleDeleteAll} ><i class="bi bi-trash3"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="table-content">

                                {tableContent}
                            </div>
                        </div>
                    ) : (
                        <p className="no-contestant">No contestant found!</p>
                    )}
                </div>

            </div>


        );
    }

    return content;
};

export default UsersList;

import { store } from '../../app/store'
import { problemsApiSlice } from '../problems/problemsApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
       const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
       const problems = store.dispatch(problemsApiSlice.endpoints.getProblems.initiate())
       return () => {
        users.unsubscribe()
        problems.unsubscribe()
       }
    }, [])

    return <Outlet />
}
export default Prefetch

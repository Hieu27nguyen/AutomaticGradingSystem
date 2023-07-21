import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isJudge = false
    let isAdmin = false
    let status = "Contestant"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isJudge = roles.includes('Judge')
        isAdmin = roles.includes('Admin')

        if (isJudge) status = "Judge"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isJudge, isAdmin }
    }

    return { username: '', roles: [], isJudge, isAdmin, status }
}
export default useAuth
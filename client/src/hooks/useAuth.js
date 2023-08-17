import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isJudge = false
    let isAdmin = false
    let status = "CONTESTANT"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo
        
        roles.map(x => x = x.toUpperCase());

        isJudge = roles.includes('JUDGE')
        isAdmin = roles.includes('ADMIN')

        if (isJudge) status = "JUDGE"
        if (isAdmin) status = "ADMIN"

        return { username, roles, status, isJudge, isAdmin }
    }

    return { username: undefined, roles: [], isJudge, isAdmin, status }
}
export default useAuth
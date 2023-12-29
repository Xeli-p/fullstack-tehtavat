import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'


const Users = () => {

    const users = useSelector(state => state.users)

    const padding = {
        padding: 5
      }


    if (!users) {
        return null
      }

    return(
    <div>
        {users && (
            <div>
                <ul>
                    {users.map((user) => (
                        <p key={user.id}>
                            <Link style={padding} to={`/users/${user.id}`}>{user.name}</Link> blogs: {user.blogs.length}
                        </p>
                    ))}
                </ul>
            </div>
        )}
    </div>
    )
}

export default Users
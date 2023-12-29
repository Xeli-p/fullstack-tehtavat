import { useSelector } from "react-redux"

const UserList = () => {

    const users = useSelector(state => state.users)

    const padding = {
        padding: 5
      }

    if (!users) {
        return null
      }

    return(                
        <div>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p><Link style={padding} to={`/users/${user.id}`}>{user.name} </Link> blogs: {user.blogs.length}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default UserList
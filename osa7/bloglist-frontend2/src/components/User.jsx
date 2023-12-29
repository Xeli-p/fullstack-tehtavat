
const User = ({user}) => {

    const padding = {
        padding: 5
      }    

    if (!user) {
        return null
      }

    return(
    <div>
        <p>username: {user.username}</p>
        <p>name: {user.name}</p>
        <h2>blogs</h2>
        <ul> {
            user.blogs.map(blog => 
                <p key={blog.title}>{blog.title}</p>
            )
            }
        </ul>
    </div>
    )
}

export default User
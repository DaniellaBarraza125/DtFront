
const User = () => {
    
    const users = users.map((user) => {
        return (
            <div key={user._id}>
                {user}
            </div>
        );
    });

    
};

export default User;
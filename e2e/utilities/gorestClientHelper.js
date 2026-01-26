function compare_users(userA, userB) {
    if (userA.name != userB.name) return false;
    if (userA.email != userB.email) return false;
    if (userA.gender != userB.gender) return false;
    if (userA.status != userB.status) return false;
    return true;
};

function copy_user(user) {
    let newUser = {...user};
    return newUser
}

module.exports = { compare_users, copy_user };
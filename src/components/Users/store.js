/* eslint-disable */
var store = {
    state: {
        users: []
    },
    setUsersAction (users) {
        this.state.users = users;
    },
    getUsersAction () {
        return this.state.users;
    }
}

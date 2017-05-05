<template>
    <users :token='token' :fields='fields' :end-point="this.endpoint" :limit="5" />
</template>

<script>
/* eslint-disable */
import Users from './components/Users/List';

export default {
    name: 'app',

    data () {
        return {
            endpoint: 'https://sandbox.glofox.com/users/findUserByBranchIdBasicInfo/56cdc0155c46bb176bb92582/',
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJzdGFnaW5nLmdsb2ZveC5jb20iLCJleHAiOjE0OTYzOTQyOTAsImlhdCI6MTQ5MzcxNTg5MCwiaXNzIjoic3RhZ2luZy5nbG9mb3guY29tIiwibmJmIjoxNDkzNzE1ODkwLCJ1c2VyIjp7Il9pZCI6IjU2Y2RjMDE1NWM0NmJiMTc2YmI5MjU4NCIsIm5hbWVzcGFjZSI6InRoZXdvZGZhY3RvcnkiLCJicmFuY2hfaWQiOiI1NmNkYzAxNTVjNDZiYjE3NmJiOTI1ODIiLCJmaXJzdF9uYW1lIjoiTWFyeSIsImxhc3RfbmFtZSI6IkJsYWNrIiwidHlwZSI6IkFETUlOIiwiaXNTdXBlckFkbWluIjpmYWxzZX19.o_j24M_5Hv0HcOebnZ5AUJRYs6oBL6PYUMB9ah5xENs',
            fields: {
                "fields": [
                    "branch_id",
                    "namespace",
                    "first_name",
                    "last_name",
                    "phone",
                    "membership",
                    "type",
                    "email",
                    "birth",
                    "active"
                ],
                "extra_fields": [
                    "full_name",
                    "expires",
                    "credits_left",
                    "member_type",
                    "membership_name",
                    "membership_plan_name",
                    "membership_force_start"
                ],
                "search_string": '',
                "active": true
            }
        }
    },

    components: {
        Users
    },
};
</script>

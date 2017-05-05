/* eslint-disable */

import Vue from 'vue';
import UsersList from '@/components/Users/List';

var propsData =  {
    endPoint: 'https://sandbox.glofox.com/users/findUserByBranchIdBasicInfo/56cdc0155c46bb176bb92582/',
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
    },
    limit: 5,
    start: 0
}

// helper function that mounts and returns the rendered text
function getRenderedText (Component, propsData) {
    const Ctor = Vue.extend(Component);
    const vm = new Ctor({ propsData: propsData }).$mount();
    return vm;
}

describe('UsersList', () => {
    var vm = getRenderedText(UsersList, propsData);

    it('should prop token be equal string', () => {
        expect(vm.fields).to.have.all.keys('fields', 'extra_fields', 'search_string', 'active');
    });

    it('should prop active be true', () => {
        expect(vm.fields.active).to.be.true;
    });

    it('should prop limit be equal 5', () => {
        expect(vm.limit).to.be.equal(5);
    });

    it('should prop start be equal 0', () => {
        expect(vm.start).to.be.equal(0);
    });

    it('should cleanFilter return no error when cleaning fields', () => {
        expect(vm.cleanFilters()).to.be.true;
    });

    it('should searchUsers return no error', () => {
        expect(vm.searchUsers()).to.be.true;
    });
});

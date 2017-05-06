<template>
    <div class="user-row">
        <span class="result-qty" v-if="start > 0">
            {{Object.keys(this.users).length}}
        </span>
        <div class="search-tool">
            <input type="text" ref="searchInput" placeholder="Search" @change="searchUsers" />
            <i class="fa fa-search" aria-hidden="true"></i>
        </div>

        <div class="wrapper">
            <div class="tabs-holder">
                <ul class="tabs">
                    <li><a href="#">All</a></li>
                    <li><a class="active" href="#">Members</a></li>
                    <li><a href="#">Memberships</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Items</a></li>
                </ul>
            </div>

            <div class="row" v-for='(user, key) in users'>
                <div class="thumbnail">
                    <img class="userpicture" src="http://placehold.it/40x40" :alt="user.User.name">
                </div>

                <div class="user-name">
                    <p class="name">{{user.User.name}}</p>
                    <span class="email">{{user.User.email}}</span>
                </div>

                <div class="credits">{{ user.User.credits_left | credits }}</div>

                <div class="membership">
                    <p>{{ user.User.membership.expiry_date | membershipMonths(user.User.membership.start_date) }}</p>
                    <span v-if="user.User.expires">Expires {{user.User.expires}}</span>
                </div>

                <div class="list-buttons">
                    <button type="button" name="button">
                        Access <i class="fa fa-sign-in" aria-hidden="true"></i>
                    </button>
                    <button type="button" name="button">
                        Book / Buy <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="no-results" v-if="noMoreResults">
            No more results
            <p><a href="javascript:void(0)" @click="cleanFilters">Clean filters</a></p>
        </div>

        <div class="loading" v-if='loading && !noMoreResults'>
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import store from './store.js';
import request from 'request';
import moment from 'moment';
import isMobile from 'ismobilejs';

export default {
    data () {
        return {
            init: true,
            start: 0,
            noMoreResults: false,
            shouldLoadMore: false,
            loadText: '',
            loading: false,
            users: []
        }
    },

    filters : {
        membershipMonths (dateOne, dateTwo) {
            if (!dateOne) {
                return "Not a member";
            }

            return moment(dateOne).diff(moment(dateTwo), 'months') + ' Month Membership';
        },

        credits (value) {
            return ((parseFloat(value) == parseInt(value)) && !isNaN(value) ? value : 0) + " Credits";
        }
    },

    computed : {},

    props: {
        token: {
            type: String,
            required: true
        },

        fields: {
            type: Object,
            required: true
        },

        endPoint: {
            type: String,
            required: true
        },

        limit: {
            type: Number,
            required: true
        }
    },

    mounted () {
        let _self = this;

        // Get first batch of users
        this.getUsers();

        if(!isMobile.any) {
            // Attach the listener for desktop with mouse wheel scroll
            document.addEventListener('wheel', this.loadMoreUsers);
        } else {
            // Debounce for mobile screens with scroll event
            window.addEventListener('scroll', function(e) {
                if (this.debounceHelper) {
                    window.clearTimeout(this.debounceHelper);
                }

                this.debounceHelper = window.setTimeout(() => {
                    if (_self.checkEndOfPage()) {
                        // Get all users
                        _self.getUsers();
                    }
                }, 200);
            });
        }
    },

    methods: {
        cleanFilters () {
            try {
                this.noMoreResults = false;
                this.fields.search_string = '';
                this.$refs.searchInput.value = '';
                this.start = 0;
                this.users = [];
                this.getUsers();

                return true;
            } catch (e) {
                return e;
            }
        },

        searchUsers () {
            try {
                this.noMoreResults = false;
                this.fields.search_string = this.$refs.searchInput.value;
                this.users = [];
                this.start = 0;
                this.getUsers();

                return true;
            } catch (e) {
                return e;
            }
        },

        loadMoreUsers (evt) {
            let _self = this;

            // Check if user reach the end of the page using scroll
            var userRowList = document.getElementsByTagName("body");
            if (!this.init && !this.checkEndOfPage(userRowList)) { return; }

            // We have a properly pressure in wheel/scroll
            if (Math.abs(evt.wheelDelta) > 140) {
                // Let's set the loading so user see we're working to load more and stop to keep pushing down
                this.loading = true;
                // We want to load more
                this.shouldLoadMore = true;
            }

            // Check if user keep pushing the scroll frantically:(
            if (this.debounceHelper) {
                // Lets clean our timeout, user should be patience,
                // we're trying to save his data plan
                window.clearTimeout(this.debounceHelper);
            }

            this.debounceHelper = window.setTimeout(() => {
                if (_self.shouldLoadMore) {
                    // Restart our helper flag
                    _self.shouldLoadMore = false;
                    // And get more users...
                    _self.getUsers();
                    // Ok, we're not in the first interaction anymore
                    if (_self.init) _self.init = false;
                }
            }, 200);
        },

        getUsers () {
            var _self = this;
            // Start loading spinner
            this.loading = true;

            // Have no results
            if (_self.noMoreResults) {
                return;
            }

            request.post({
                url: this.endPoint + this.limit + "/" + this.start,
                form: JSON.stringify(this.fields),
                json: true
            }, (error, response, body) => {
                if (!error) {
                    // No results from request
                    if (!body.length) {
                        _self.loading = false;
                        _self.noMoreResults = true;
                        return;
                    }
                    // Ok we have users, push to our data object
                    for (var item in body) {
                        if (body.hasOwnProperty(item)) {
                            _self.users.push(body[item]);
                        }
                    }

                    _self.loading = false;
                    // Increase the number we should start to fetch more users
                    _self.start = _self.start + _self.limit;

                    // setTimeout(function () { window.scrollTo(0, document.querySelector('.anchor').offsetTop); }, 10);
                } else {
                    _self.loadText = "Error while loading more results..."
                }
            }).auth(null, null, true, this.token);
        },

        checkEndOfPage(elem) {
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {

                return true;
            }
        }
    }
}
</script>

<style lang="scss" src="./scss/Users.scss" scoped></style>

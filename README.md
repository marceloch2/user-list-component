# ui-members

## Build Setup

``` bash
# install dependencies
npm install

# run e2e tests
# I did the 2e2 test using testCafe instead nightwatch.js
# This is fun, run the command and wait to check all your browsers resize to iphone 6 size and do the test for my responsiveness.
npm run test-cafe

# serve with hot reload at localhost:8080
npm run dev

# run unit tests
npm run unit

```
I like React and Vue.js, i chose Vue.js for simplicity with one file component. I could split it in many small components but to show my logic behind lazy load you guys can check my code in just one place.

If need change how much items per load just change the prop in the component declaration.
``` bash
<users :token='token' :fields='fields' :end-point="this.endpoint" :limit="XXX" />
```

Check the mobile interface accessing in your device your external IP on port :8080.
ex: 192.168.x.x:8080

Remember to do the test searching for "John" and scrolling for more results to see the treatment for "no results - clean filters".

To show my skills i did my interface without use bootstrap or alike, i did vanilla js debounce, not underscore, lodash or jquery. My media-query with pure scss without grid system and used flex-box to better alignment when resizing.

I did my list with lazy-load checking for mouse wheel with a wheelDelta intense pressure number, after some test i got a good usability i think, avoiding user to get more results when he is just trying to check the end of the first list and not loading more.

The search input for now is triggered with Enter key, so just type "John" and press Enter to test.

######### For e2e test.
``` bash
npm run test-cafe

```

Same for Unit test, with time i definitely would add Vuex with Pure Functions, this way the Unit test is easy and more fun to write.
``` bash
npm run unit

```

Before write my markup i've checked for the most semantic element, as always i could just start with
``` bash
<section><header><main><footer>
```
But reading the comments about the Section semantic we can see that it will not be the best element as we don't have a H1, H2, H3,..., and the list don't represent a section of big information related to the entire app, so better keep simple.

http://html5doctor.com/the-section-element

So for the component to be reused in many projects easily and safe i decide to go with DIV as it will interferer less as possible with the semantic of the host project.


The Component SCSS is SCOPED so will never conflict with the global style.



####################

If more time what would be better?

- I could use Single State Tree Manager (Vuex, Redux, VanillaJs) with pure function to easy test.

- I should use BEM for my scss convention.


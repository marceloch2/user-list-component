# ui-members

## Build Setup

``` bash
# install dependencies
npm install

# run e2e tests
# I did the 2e2 test using testCafe instead nightwatch.js
# This is fun, check the test for Resize in Iphone 6 size happening :)
npm run test-cafe

# serve with hot reload at localhost:8080
npm run dev

# run unit tests
npm run unit

```

I did my list with lazy-load checking for mouse wheel with a wheelDelta intense pressure number, after some test i got a good usability i think, avoiding user to get more results when he is just trying to check the end of the first list and not loading more.

The search input for now is triggered with Enter key, so just type "John" and press Enter to test, please.

For e2e test you guys can run this command bellow, i did a few verifications for default behaviour.
``` bash
npm run test-cafe

```

Same for Unit test, with time i definitely would add Vuex with .js file extension and not .vue for Mutations/Reducers with Pure Functions, this way the Unit test is easy and much more fun to write.
``` bash
npm run unit

```

####################

If more time what would be better?


Before write my markup i checked for the most semantic element, as always i could just start with <section><header><main><footer>, etc..., but reading the comments about the Section semantic we can see that it will not be the best element as we don't have a Header and the list don't represent a section of big information related to the entire app, so better keep simple.

http://html5doctor.com/the-section-element

Also for the component to be reused in many projects i decide to go with <div> as it will interferer less as possible with the semantic of the host project.

I should make use of BEM for my scss name convention.

I have a warning in my chrome but it was explained in this link bellow.
http://stackoverflow.com/questions/39152877/consider-marking-event-handler-as-passive-to-make-the-page-more-responsive
[Violation] Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive.

I could use Single State Tree Manager (Vuex, Redux, VanillaJs) with pure function to easy test.

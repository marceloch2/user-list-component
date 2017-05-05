// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'Default e2e for User List' : function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .waitForElementVisible('body', 10000)
            .pause(5000)
            .assert.elementCount(".row", 5)
        .end();
    }
};

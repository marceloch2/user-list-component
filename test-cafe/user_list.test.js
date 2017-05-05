import { Selector } from 'testcafe';

fixture('Testing User List')
.page('http://localhost:8080');

test('Check if search exist', async t => {
    const searchExist = Selector('.search-tool > input').exists;

    await t.expect(searchExist).ok();
});

test('Check user list exist', async t => {
    const usersListExist = Selector('.row').exists;

    await t.expect(usersListExist).ok();
});

test('Check user list have 5 initial items', async t => {
    const usersListCount = Selector('.row').count;

    await t.expect(usersListCount).eql(10);
});

test('Simulate iPhone 6 and check if responsiveness will work for user list media-query', async t => {
    const usersList = Selector('.row');
    await t
        .resizeWindowToFitDevice('iPhone 6', {
            portraitOrientation: true
        })
        .expect(usersList.getStyleProperty('display')).eql('flex')
        .expect(usersList.getStyleProperty('flex-direction')).eql('column');
});

test('Fill search input and check if results appear and have 5 items', async t => {
    const usersListCount = Selector('.row').count;
    const searchInput = Selector('.search-tool > input');

    await t
        .typeText(searchInput, 'John')
        .pressKey('enter')
        .expect(usersListCount).eql(5);
});

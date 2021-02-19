import { Selector } from 'testcafe';

const contactUsLink = Selector('div.nav-collapse ul.nav li#nav-contact');
const selector = Selector('div.form-actions')
const forenameErrorMessageSelector = Selector('span[id="forename-err"]');
const emailErrorMessageSelector = Selector('span[id="email-err"]');
const textAreaSelector = Selector('span[id="message-err"]');

fixture `Contact Form - No Page Object`
    .page `https://jupiter.cloud.planittesting.com`




test('I can validate errors on the "Contact" page', async t => {
    await t
        .click(contactUsLink)
        .click(selector.find('a').withText('Submit'))
        .expect(forenameErrorMessageSelector.textContent).eql('Forename is required')
        .expect(emailErrorMessageSelector.textContent).eql('Email is required')
        .expect( textAreaSelector.textContent).eql('Message is required')
})

test('Error messages should not appear on valid inputs', async t => {
    await t
        .click(contactUsLink)
        .expect(forenameErrorMessageSelector.exists).notOk()
        .expect(emailErrorMessageSelector.exists).notOk()
        .expect(textAreaSelector.exists).notOk()
})





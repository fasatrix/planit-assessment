import ContactPageObject from '../pages/contactFormPageObject';
import { url } from '../common/common';

fixture`Contact Form with Page Object`.page`${url}`;

test('I can validate errors on the "Contact" page', async (t) => {
  await ContactPageObject.navigateToContactPage();
  await ContactPageObject.submitForm();
  await t
    .expect(ContactPageObject.forenameErrorSelector.textContent)
    .eql('Forename is required')
    .expect(ContactPageObject.emailErrorSelector.textContent)
    .eql('Email is required')
    .expect(ContactPageObject.textAreaErrorSelector.textContent)
    .eql('Message is required');
});

test('I can populate all mandatory fields and successfully submit the "Contact" page form', async (t) => {
  await ContactPageObject.navigateToContactPage();
  await ContactPageObject.inputName('Fabio');
  await ContactPageObject.inputEmail('f@f.com');
  await ContactPageObject.inputTextArea(
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  );
  await ContactPageObject.submitForm();
  await t.expect(ContactPageObject.exitMessage.textContent).contains('Thanks');
});

test('I can populate all mandatory fields and successfully submit the "Contact" page form, using a generic Input method', async (t) => {
  await ContactPageObject.navigateToContactPage();
  await ContactPageObject.typeTextIn('Fabio', 'forename');
  await ContactPageObject.typeTextIn('f@f.com', 'email');
  await ContactPageObject.inputTextArea(
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  );
  await ContactPageObject.submitForm();
  await t.expect(ContactPageObject.exitMessage.textContent).contains('Thanks');
});

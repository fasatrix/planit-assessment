import { Selector, t } from 'testcafe';

class Inputs {
  constructor(elm) {
    this.input = Selector('div.control-group');
    this.field = this.input.find(`${elm}`);
  }
}

class ContactFormPageObject {
  constructor() {
    this.contactLinkSelector = Selector(
      'div.nav-collapse ul.nav li#nav-contact > a'
    );
    this.forenameErrorSelector = Selector('span[id="forename-err"]');
    this.emailErrorSelector = Selector('span[id="email-err"]');
    this.textAreaErrorSelector = Selector('span[id="message-err"]');
    this.forename = Selector('input[id="forename"]');

    this.email = Selector('input[id="email"]');
    this.textArea = Selector('textarea[id="message"]');
    this.exitMessage = Selector(
      'div.ng-scope > div.alert.alert-success > strong.ng-binding'
    );
    this.submit = Selector('div.form-actions').find('a').withText('Submit');
    this.input = new Inputs('input');
  }

  async submitForm() {
    await t.click(this.submit);
  }

  async navigateToContactPage() {
    await t.maximizeWindow().click(this.contactLinkSelector);
  }

  async inputName(text) {
    await t.typeText(this.forename, text);
  }

  async inputEmail(text) {
    await t.typeText(this.email, text);
  }
  async inputTextArea(text) {
    await t.typeText(this.textArea, text);
  }

  async typeTextIn(text, as) {
    await t.typeText(this.input.field.withAttribute('name', `${as}`), text);
  }
}

export default new ContactFormPageObject();

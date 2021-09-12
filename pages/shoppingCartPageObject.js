import { t, Selector } from 'testcafe';
import formPage from './contactFormPageObject';

const UnitPrice = {
  'Teddy Bear': 12.99,
  'Stuffed Frog': 10.99,
  'Handmade Doll': 10.99,
  'Fluffy Bunny': 9.99,
  'Smiley Bear': 14.99,
  'Funny Cow': 10.99,
  'Valentine Bear': 14.99,
  'Smiley Face': 9.99
};

class ShoppingCartPage {
  constructor() {
    this.h4 = Selector('h4.product-title');
    this.cartItemsNumber = Selector('#nav-cart > a');
    this.tableOfItems = Selector('tbody > tr > td');
    this.total = Selector('td > strong');
    this.checkOutBtn = Selector('a.btn-checkout');
    this.yesBtn = Selector(
      'body > div.popup.modal.hide.ng-scope.in > div.modal-footer > a.btn.btn-success'
    );
    this.emptyCartBtn = Selector('a[class="btn btn-danger ng-scope"]');
  }

  async addProductByName(product) {
    let clickToBuy;
    if (typeof product === 'string') {
      clickToBuy = this.h4
        .withText(product)
        .parent('li')
        .find('a')
        .withText('Buy');
      await t.click(clickToBuy);
    } else if (Array.isArray(product)) {
      for (const p of product) {
        clickToBuy = this.h4.withText(p).parent('li').find('a').withText('Buy');
        await t.maximizeWindow().click(clickToBuy);
      }
    }
  }

  async checkOutContainsProduct(text) {
    return t.expect(this.tableOfItems.withText(text).innerText).contains(text);
  }

  async numberOfItems() {
    return this.cartItemsNumber.child('span').innerText;
  }

  async navigateToCart() {
    return t.maximizeWindow().click(this.cartItemsNumber);
  }

  async updateQuantityFor(productName, newQuantity) {
    // the following is needed due to a leading space in the product name
    const productNameWithSpace = productName + new Array(1).join(' ');
    const selector = await this.tableOfItems
      .withText(productNameWithSpace)
      .parent('tr')
      .find('td > input');
    await t.typeText(selector, newQuantity.toString(), { replace: true });
    const total = this.getTotalAmount([productName]) * newQuantity;
    await t.expect(this.total.innerText).eql(`Total: ${total.toString()}`);
  }

  getTotalAmount(products) {
    let total = 0;
    for (const p of products) {
      total = total + UnitPrice[p];
    }
    return total;
  }

  async emptyCart() {
    await t.click(this.emptyCartBtn).click(this.yesBtn);
  }

  async checkOut() {
    await this.navigateToCart();
    await t
      .click(this.checkOutBtn)
      .expect(formPage.pageName.innerText)
      .eql('Delivery Details');
  }

  async deleteByProductName(productName) {
    // the following is needed due to a leading space in the product name
    const productNameWithSpace = productName + new Array(1).join(' ');
    const item = await this.tableOfItems
        .withText(productNameWithSpace)
        .parent('tr')
        .find('a > i');
    await t.click(item).click(this.yesBtn);
  }

}

export default new ShoppingCartPage();

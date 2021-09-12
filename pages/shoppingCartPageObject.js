import { t, Selector } from 'testcafe';

class ShoppingCartPage {
  constructor() {
    this.h4 = Selector('h4.product-title');
    this.cartItemsNumber = Selector('#nav-cart > a');
    this.tableOfItems = Selector('tbody > tr > td');
    this.total = Selector('td > strong');
  }

  async addProductByName(text) {
    const clickToBuy = this.h4
      .withText(text)
      .parent('li')
      .find('a')
      .withText('Buy');
    await t.click(clickToBuy);
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

  async updateQuantityFor(productName, newQuantity, unitPrice) {
    await this.addProductByName(productName.trim());
    await this.navigateToCart();
    const selector = await this.tableOfItems
      .withText(productName)
      .parent('tr')
      .find('td > input');
    await t
      .typeText(selector, newQuantity.toString(), { replace: true })
      .expect(this.total.innerText)
      .eql(`Total: ${(unitPrice * newQuantity).toString()}`);
  }
}

export default new ShoppingCartPage();

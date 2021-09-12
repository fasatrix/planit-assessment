import ShoppingCartPage from '../pages/shoppingCartPageObject';
import shoppingCartPageObject from '../pages/shoppingCartPageObject';


fixture`Shopping Cart with Page Object`
  .page`https://jupiter.cloud.planittesting.com/#/shop`;

test('I should be able to add 1 item in the shopping cart by name', async (t) => {
  await ShoppingCartPage.addProductByName('Stuffed Frog');
  await t.expect(await ShoppingCartPage.numberOfItems()).eql('1');
});
test('I should be able to add 2 items in the shopping cart by name', async (t) => {
  await ShoppingCartPage.addProductByName('Stuffed Frog');
  await ShoppingCartPage.addProductByName('Handmade Doll');
  await t.expect(await ShoppingCartPage.numberOfItems()).eql('2');
});

test("I should be able to see an added item in the cart checkout's page", async (t) => {
  await ShoppingCartPage.addProductByName('Stuffed Frog');
  await ShoppingCartPage.navigateToCart();
  await ShoppingCartPage.checkOutContainsProduct('Stuffed Frog');
});
test('I should be able to see the correct "Total" while updating the number of items for the same Product', async (t) => {
  const product = 'Stuffed Frog';
  await shoppingCartPageObject.addProductByName(product);
  await shoppingCartPageObject.navigateToCart();
  await ShoppingCartPage.updateQuantityFor(product, 3, 10.99);
});
test('I should be able to see the correct "Total" if I add multiple products', async (t) => {
  const products = ['Stuffed Frog', 'Teddy Bear', 'Fluffy Bunny' ];
  await shoppingCartPageObject.addProductByName(products);
  await ShoppingCartPage.navigateToCart();
  const total = shoppingCartPageObject.getTotalAmount(products);
  await t.expect(shoppingCartPageObject.total.innerText).eql(`Total: ${total.toString()}`);
});

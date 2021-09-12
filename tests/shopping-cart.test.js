import ShoppingCartPage from '../pages/shoppingCartPageObject';

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
test('I should be able to see the correct "Total" while updating the number of items', async (t) => {
  await ShoppingCartPage.updateQuantityFor(
    ' Stuffed Frog',
    2,
    10.99
  );
});

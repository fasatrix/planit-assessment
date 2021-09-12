import sc from '../pages/shoppingCartPageObject';

fixture`Shopping Cart with Page Object`
  .page`https://jupiter.cloud.planittesting.com/#/shop`;

test('I should be able to add 1 item in the shopping cart by name', async (t) => {
  await sc.addProductByName('Stuffed Frog');
  await t.expect(await sc.numberOfItems()).eql('1');
});
test('I should be able to add 2 items in the shopping cart by name', async (t) => {
  await sc.addProductByName('Stuffed Frog');
  await sc.addProductByName('Handmade Doll');
  await t.expect(await sc.numberOfItems()).eql('2');
});

test("I should be able to see an added item in the cart checkout's page", async (t) => {
  await sc.addProductByName('Stuffed Frog');
  await sc.navigateToCart();
  await sc.checkOutContainsProduct('Stuffed Frog');
});
test('I should be able to see the correct "Total" while updating the number of items for the same Product', async (t) => {
  const product = 'Stuffed Frog';
  await sc.addProductByName(product);
  await sc.navigateToCart();
  await sc.updateQuantityFor(product, 3, 10.99);
});
test('I should be able to see the correct "Total" if I add multiple products', async (t) => {
  const products = ['Stuffed Frog', 'Teddy Bear', 'Fluffy Bunny'];
  await sc.addProductByName(products);
  await sc.navigateToCart();
  const total = sc.getTotalAmount(products);
  await t.expect(sc.total.innerText).eql(`Total: ${total.toString()}`);
});

test('I should be able to add multiple products and empty the cart', async (t) => {
  const products = ['Stuffed Frog', 'Teddy Bear', 'Fluffy Bunny'];
  await sc.addProductByName(products);
  await sc.navigateToCart();
  await sc.emptyCart();
  await t.expect(await sc.numberOfItems()).eql('0');
});
test('I should be able to add multiple products and checkout', async (t) => {
  const products = ['Stuffed Frog', 'Teddy Bear', 'Fluffy Bunny'];
  await sc.addProductByName(products);
  await sc.navigateToCart();
  await sc.checkOut();
});

test('I should be able to add and then delete a product from the shopping cart', async (t) => {
  const product = 'Stuffed Frog';
  await sc.addProductByName(product);
  await t.expect(await sc.numberOfItems()).eql('1');
  await sc.navigateToCart();
  await sc.deleteByProductName(product)
  await t.expect(await sc.numberOfItems()).eql('0');
});


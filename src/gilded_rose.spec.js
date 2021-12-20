const { Item, update_quality } = require("./gilded_rose");

var items = []

beforeEach(() => {
  items = [];

  items.push(new Item("+5 Dexterity Vest", 10, 20));
  items.push(new Item("Aged Brie", 2, 0));
  items.push(new Item("Elixir of the Mongoose", 5, 7));
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
  items.push(new Item("Conjured Mana Cake", 3, 6));
  items.push(new Item("Baduweiser Beer", 0, 50));
  items.push(new Item("Heneken", 1, 1));

  items = update_quality(items);
});


test("At the end of each day our system lowers both values for every item", () => {
  expect(items[0].quality).toBe(19);
  expect(items[0].sell_in).toBe(9);
});

test("Once the *sell_in* days is less then zero, *quality* degrades twice as fast", () => {
  expect(items[6].quality).toBe(48);
  expect(items[6].sell_in).toBe(-1);
});

test("The *quality* of an item is never negative", () => {
  expect(items[7].quality).toBeGreaterThanOrEqual(0);
});

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

test("\"Aged Brie\" actually increases in *quality* the older it gets", () => {
  expect(items[1].quality).toBeGreaterThanOrEqual(1);
  expect(items[1].sell_in).toBeGreaterThanOrEqual(1);
});

test("The *quality* of an item is never more than 50 - Aged Brie", () => {
  for (var i = 0; i < 50; i++) { // more than 50 days
    items = update_quality(items);
  }
  expect(items[1].quality).toBeLessThanOrEqual(50);
});

test("\"Sulfuras\", being a legendary item, never has to be sold nor does it decrease in *quality*", () => {
  for (var i = 0; i < 10; i++) {
    items = update_quality(items);
  }
  expect(items[3].quality).toBe(80);
});

test(`"Backstage passes", like aged brie, increases in *quality* as it's *sell_in*
value decreases; *quality* increases by 2 when there are 10 days or less
and by 3 when there are 5 days or less but *quality* drops to 0 after the
concert`, () => {

  expect(items[4].quality).toBe(21);
  for (var i = 0; i < 4; i++) { // 5 days passed (1 day already passed in beforeEach)
    items = update_quality(items);
  }
  expect(items[4].quality).toBe(25);

  for (var i = 0; i < 5; i++) { // 5 days passed
    items = update_quality(items);
  }
  expect(items[4].quality).toBe(35);

  items = update_quality(items);
  expect(items[4].quality).toBe(38);
});
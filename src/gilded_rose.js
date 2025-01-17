function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}


function update_quality(_items = []) {
  const items = [..._items];
  for (var i = 0; i < items.length; i++) {
    if (
      items[i].name != "Aged Brie" &&
      items[i].name != "Backstage passes to a TAFKAL80ETC concert"
    ) {
      if (items[i].quality > 0) {
        if (items[i].name != "Sulfuras, Hand of Ragnaros") {
          if (items[i].name == "Conjured Mana Cake") {
            items[i].quality = items[i].quality - 2;
          } else {
            items[i].quality = items[i].quality - 1;
          }
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1;
        if (items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1;
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1;
            }
          }
        }
      }
    }
    if (items[i].name != "Sulfuras, Hand of Ragnaros") {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != "Aged Brie") {
        if (items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
          if (items[i].quality > 0) {
            if (items[i].name != "Sulfuras, Hand of Ragnaros") {
              items[i].quality = items[i].quality - 1;
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality;
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1;
        }
      }
    }
  }
  return items;
}

module.exports = {
  update_quality,
  Item,
};

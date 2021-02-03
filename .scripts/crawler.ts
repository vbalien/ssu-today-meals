import { time } from "https://denopkg.com/burhanahmeed/time.ts@v2.0.1/mod.ts";

const places: Place[] = [
  { id: 1, name: "학생식당" },
  { id: 2, name: "도담식당" },
  { id: 7, name: "FACULTY LOUNGE" },
  { id: 4, name: "스낵코너" },
  { id: 5, name: "푸드코트" },
  { id: 6, name: "THE KITCHEN" },
];

interface Place {
  id: number;
  name: string;
}
interface Menu {
  kind: string;
  foods: string;
  price: number;
}

const currentDate = time().tz("asia/seoul").t;

async function getMenus(
  place: Place,
  date: Date = currentDate,
): Promise<Menu[]> {
  const result: Menu[] = [];
  const re = new RegExp(
    /\<td class="menu_nm"\>(?<kind>.*?)<\/td\>.*?\<td class="menu_list"\>(?<foods>.*?)<\/td>/gis,
  );
  const rePrice = new RegExp(/\s*?-\s*?(\d+\.\d+)/i);
  const reKitchen = new RegExp(
    /\>(?<foods>[^\<]*?\s*?-\s*?\d+\.\d+?)\</gis,
  );
  const res = await fetch(
    `http://m.soongguri.com/m_req/m_menu.php?rcd=${place.id}&sdt=${date
      .getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDay().toString().padStart(2, "0")}`,
  );
  const body = await res.text();

  const matches = body.matchAll(place.id === 6 ? reKitchen : re);

  if (matches) {
    for (const m of matches) {
      if (m.groups?.foods) {
        let price = 0;
        const priceM = m.groups.foods.match(rePrice);
        if (priceM) {
          price = Number.parseFloat(priceM[1]) * 1000;
        }
        result.push({
          kind: m.groups.kind,
          foods: m.groups.foods.replace(rePrice, "").trim(),
          price,
        });
      }
    }
  }

  return result;
}

for (const place of places) {
  try {
    const data = {
      name: place.name,
      menus: await getMenus(place),
    };
    await Deno.writeTextFile(
      `./data/${place.id}.json`,
      JSON.stringify(data, null, 2),
    );
    console.log(`File written to ./data/${place.id}.json`);
  } catch (err) {
    console.error(err);
  }
}

try {
  await Deno.writeTextFile(
    `./data/metadata.json`,
    JSON.stringify({ places, lastUpdated: currentDate.getTime() }, null, 2),
  );
  console.log(`File written to ./data/metadata.json`);
} catch (err) {
  console.error(err);
}

export {};

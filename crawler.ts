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
  price: string;
}

async function getMenus(
  place: Place,
  date: Date = new Date(),
): Promise<Menu[]> {
  const result: Menu[] = [];
  const re = new RegExp(
    /\<td class="menu_nm"\>(?<kind>.*?)<\/td\>.*?\<td class="menu_list"\>(?<foods>.*?)<\/td>/gis,
  );
  const reKitchen = new RegExp(
    /\>(?<foods>[^\<]*? - \d+\.\d+?)\</gis,
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
        let price = "";
        const priceM = m.groups.foods.match(/ - (\d+\.\d+)/);
        if (priceM) {
          price = priceM[1];
        }
        result.push({
          kind: m.groups.kind,
          foods: m.groups.foods,
          price,
        });
      }
    }
  }

  return result;
}

try {
  await Deno.writeTextFile(
    `./data/metadata.json`,
    JSON.stringify(places, null, 2),
  );
  console.log(`File written to ./data/metadata.json`);
} catch (err) {
  console.error(err);
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

export {};

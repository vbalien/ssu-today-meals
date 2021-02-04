const places: Place[] = [
  { id: 1, name: "학생식당" },
  { id: 2, name: "숭실도담" },
  { id: 7, name: "FACULTY LOUNGE" },
  { id: 4, name: "스넥코너" },
  { id: 5, name: "푸드코트" },
  { id: 6, name: "더 키친" },
];

interface Place {
  id: number;
  name: string;
}
interface Menu {
  kind: string;
  foods: string;
  price?: number;
  image?: string;
}

const baseURL = "https://soongguri.com";

async function getPlaceBody(pageBody: string, place: Place) {
  const re = new RegExp(
    `<td colspan="6" class="rest_nm">${place.name}<\\/td>.*?<table style="width:100%;" cellpadding="0" cellspacing="1" border="0" >.*?<\\/table>\\s*?<\\/td>\\s*?<\\/tr>`,
    "gis",
  );
  const bodyMatch = pageBody.match(re);
  if (bodyMatch && bodyMatch.length > 0) {
    return bodyMatch[0];
  }
}

function makeMenu(kind: string, foods: string, image?: string): Menu {
  const rePrice = new RegExp(
    /(?:\s*?-\s*?(\d+\.\d+))|(?:<br><span style='color:#767906;font-size:12pt;padding:5px;'>.*?<\/span>)/i,
  );
  const deletePattern = new RegExp(
    rePrice.source +
      `|(?:<img src='\\/images\\/ico_recmenu.gif'>)` +
      `|(?:font-size: .*?;)`,
    "gis",
  );
  let price = undefined;
  const priceM = foods.match(rePrice);
  foods = foods.replace(deletePattern, "").trim();
  if (priceM) {
    price = Number.parseFloat(priceM[1]) * 1000;
  }
  return ({
    kind,
    foods,
    price,
    image,
  });
}

async function getMenus(
  placeBody: string,
  isKitchen: boolean,
): Promise<Menu[]> {
  const result: Menu[] = [];
  const reMenuKind = new RegExp(/\<td class="rest_mn".*?\>(.*?)<\/td\>/gis);
  const reMenu = new RegExp(
    /\<td style="vertical-align:top;"\>(?<foods>.*?)\<\/td>.*?(?:\<td style="vertical-align:top;padding:0 0 0 3px;"\>.*?\<img.*?src='(?<image>.*?)'.*?)?\<\/table\>/gis,
  );
  const reKitchenMenu = new RegExp(/\>([^\<]*?\s*?-\s*?\d+\.\d+?)\</gis);

  const kindMatches = [...placeBody.matchAll(reMenuKind)];
  const menuMatches = [...placeBody.matchAll(reMenu)];

  for (let i = 0; i < kindMatches.length; ++i) {
    const kind = kindMatches[i][1];
    const menu = menuMatches[i].groups;
    if (!menu) continue;
    const image = menu.image && `${baseURL}${menu.image}`;
    if (isKitchen) {
      const matches = menu.foods.matchAll(reKitchenMenu);
      for (const m of matches) {
        result.push(makeMenu(kind, m[1]));
      }
    } else {
      const data = makeMenu(kind, menu.foods, image);
      data.foods && result.push(data);
    }
  }

  return result;
}

const pageBody = await (await fetch(`${baseURL}/main.php?mkey=2&w=3`)).text();

for (const place of places) {
  const placeBody = await getPlaceBody(pageBody, place);
  try {
    const data = {
      name: place.name,
      menus: placeBody ? await getMenus(placeBody, place.id === 6) : [],
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
    JSON.stringify({ places, lastUpdated: Date.now() }, null, 2),
  );
  console.log(`File written to ./data/metadata.json`);
} catch (err) {
  console.error(err);
}

export {};

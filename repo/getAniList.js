export async function getAniList(week) {
  return await fetch(
    `http://anitable.alien.moe/list?w=${encodeURIComponent(week)}`
  );
}

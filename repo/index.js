export async function getMetadata(week) {
  return await fetch(`./data/metadata.json?t=${Date.now()}`);
}

export async function getPlace(placeId, signal) {
  return await fetch(`./data/${placeId}.json?t=${Date.now()}`, { signal });
}

export async function getMetadata(week) {
  return await fetch(`/data/metadata.json?t=${Date.now()}`);
}

export async function getPlace(placeId) {
  return await fetch(`/data/${placeId}.json?t=${Date.now()}`);
}

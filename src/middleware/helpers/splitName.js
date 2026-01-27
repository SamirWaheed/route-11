 export default function splitName (userName) {
  if (!userName) return [null, null, null];

  const parts = userName.toLowerCase().trim().split(/\s+/);
  const [first, mid, ...last] = parts;
  return [
    first ?? null, mid ?? null, last.length ? last.join(' ') : null
  ];

}
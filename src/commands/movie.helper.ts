
const parseRating = (s: { Source: any; Value: string; }) => {
  const a = s.Source;
  if ('Rotten Tomatoes' === a) return `🍅${s.Value}`;
  if ('Internet Movie Database' === a) return `⭐${s.Value.replace('/10', '')}`;
  if ('Metacritic' === a) return `Ⓜ️${s.Value}`;
  return undefined;
};

const getRating = (r: any[]) => {
  if (!Array.isArray(r) || r.length === 0) return '';
  const rating = r.map(parseRating).filter(f => f !== undefined);
  return rating.length > 0 ? `_${rating.join(' ')}_` : '';
}

const getMessage = (data: { Title: any; Ratings: any[]; Released: any; DVD: string; }) => {
  const msg = [
    `*${data.Title}* ${getRating(data.Ratings)}`,
    `🎦 Release: ${data.Released}`,
  ];
  if (data.DVD !== 'N/A') msg.push(`📀 Disk: ${data.DVD}`);

  return msg.join('\n');
}

export { parseRating, getRating, getMessage };

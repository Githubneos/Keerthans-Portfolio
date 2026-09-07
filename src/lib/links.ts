export const EMAIL = 'karumudikeerthan@gmail.com'

export const SOCIAL_LINKS = {
  github: 'https://github.com/Githubneos',
  linkedin: 'https://www.linkedin.com/in/keerthan-karumudi',
  instagram: 'https://instagram.com/keerthan.karumudi',
  x: 'https://x.com/humblelime',
  substack: 'https://substack.com/@skepticaloptimist1',
} as const

export const SUBSTACK_FEED_URL = 'https://spacesignal1.substack.com/feed'

export const RSS_TO_JSON_URL = (feedUrl: string) =>
  `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`

export const PROJECT_REPOS = {
  chaintrace: 'https://github.com/Githubneos/Chaintrace',
  rideMatch: 'https://github.com/Githubneos/ride-match-',
  matchWeek: 'https://github.com/Githubneos/MatchWeek',
  drinksAndDrifts: 'https://github.com/Githubneos/Drinks-and-Drifts',
} as const

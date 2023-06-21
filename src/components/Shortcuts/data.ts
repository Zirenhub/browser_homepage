import youtubeIco from '../../assets/youtube.svg';
import redditIco from '../../assets/reddit.svg';
import twitchIco from '../../assets/twitch.svg';
import twitterIco from '../../assets/twitter.svg';
import windyIco from '../../assets/windy.svg';

import { TShortcut } from '../../types/shortcuts';
import { v4 as uuidv4 } from 'uuid';

const shortcuts: TShortcut[] = [
  {
    name: 'Youtube',
    link: 'https://www.youtube.com/',
    ico: youtubeIco,
    _id: uuidv4(),
  },
  {
    name: 'Reddit',
    link: 'https://www.reddit.com/',
    ico: redditIco,
    _id: uuidv4(),
  },
  {
    name: 'Twitch',
    link: 'https://www.twitch.tv/',
    ico: twitchIco,
    _id: uuidv4(),
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/',
    ico: twitterIco,
    _id: uuidv4(),
  },
  {
    name: 'Windy',
    link: 'https://www.windy.com/',
    ico: windyIco,
    _id: uuidv4(),
  },
];

export default shortcuts;

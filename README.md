# PsnProfile API

## About & Credits

[Psn Profiles](https://psnprofiles.com/) provides information and data about games and trophies.

This library is a simple wrapper api to fetch data from [Psn Profiles](https://psnprofiles.com/) (profile and trophies).
It is an awesome website and a great service, also heavily living from community data. Please check the website and suport it.

## Usage

* typescript

```typescript
import PsnProfileService from 'psnprofile';

const profile = await PsnProfileService.profile('leonardoalemax')
const firstGame = await PsnProfileService.game(profile.games[0].link)

```

## License

![WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png)

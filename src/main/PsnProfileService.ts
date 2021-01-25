
import {PsnProfileParser} from './PsnProfileParser'
import {PsnProfileEntry} from './interfaces/PsnProfileEntry'
import  axios  from 'axios';

export default class PsnProfileService {
  public static BASE_URL: string = 'https://psnprofiles.com';

  static async profile(name: string): Promise<PsnProfileEntry> {
    let html = await PsnProfileService.loadProfilePage(name, 1)
    let entry = PsnProfileParser.parseProfile(html, name);

    return entry;
  }

  static async game(link: string): Promise<any> {
    let { data } = await axios.get<{html:any}>(
      `${PsnProfileService.BASE_URL}${link}?secret=show`
    );

    return PsnProfileParser.parseGameDetail(data + "");
  }

  static async loadProfilePage(name:string, page:number): Promise<string> {
    let { data } = await axios.get<{html:any}>(
      `${PsnProfileService.BASE_URL}/${name}?ajax=1&completion=all&order=last-played&pf=all&page=${page}`
    );

    if(data.html.includes('No games found')) {
      return data.html
    } else {
      return data.html + await PsnProfileService.loadProfilePage(name, page+1);
    }
  }
}
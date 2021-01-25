
const cheerio = require('cheerio');
import { PsnProfileEntry } from './interfaces/PsnProfileEntry'
import { PsnProfileGameEntry } from "./interfaces/PsnProfileGameEntry";
import { PsnProfileTrophieEntry } from "./interfaces/PsnProfileTrophieEntry";

export class PsnProfileParser {

  static parseProfile(html: string, user: string): PsnProfileEntry {
    const $ = cheerio.load(`<body><table>${html}</table></body>`);
    let name = user

    let gamesEl = $('tr');
    let games = [];

    gamesEl.each((el) => games.push(this.parseGame($, gamesEl[el])));
    
    // remove last not need item
    games.pop()

    return {
      name,
      games
    }
  }

  static parseGameDetail(html: string): any {
    const $ = cheerio.load(html);

    let title = $($("#content .title h3")[0]).text().replace('Trophies', '').trim();
    let smallInfo = $($("#content table.box .small-info")[0]).text();

    // first are trophies areas and last are details holder
    let boxEl = $("#content .row div.box.no-top-border")
    let boxes = [];
    boxEl.each((el) => boxes.push(boxEl[el]))

    let detail = boxes.pop()

    let trophies = [];

    boxes.forEach((boxEl) => {
      let trophiesEl = $(boxEl).find("table.zebra:last-child tr")
      let base = $(boxEl).find("table.zebra:first-child tr .title").text()
      let dlc = base.trim() === '' ? undefined : this.cleanText(base) 

      trophiesEl.each((el) => {
        let parsedTrophie = this.parseTrophie($, trophiesEl[el], dlc)

        if(parsedTrophie) trophies.push(parsedTrophie)
      });
    })


    return {
      title,
      trophies,
      ...this.smallInfoParser(smallInfo)
    }
  }

  static smallInfoParser(text): { trophiesStatus: string, lastPlayed:string} {
    const smallInfo = text.split('Trophies')

    return {
      trophiesStatus: this.cleanText(smallInfo[0]),
      lastPlayed: this.cleanText(smallInfo[1]),
    }
  }

  private static cleanText(text): string {
    return text && text.replace(/\n/g, '').replace(/\t/g, '  ').replace(/\s+/g, " ").replace(/\b/g, '').trim()
  }

  private static parseGame($:any,  html: Node): PsnProfileGameEntry {
    const title = $(html).find('.title').text()
    const link = $(html).find('.title').attr('href')

    const infosEl = $(html).find('.small-info');
    const infos = []
    infosEl.each((i) => infos.push($(infosEl[i]).text()));

    const smallInfors = this.smallInfoParser(infos.join(" "))
    return {
      title,
      link,
      ...smallInfors
    };
  }

  private static parseTrophie($:any,  html: Node, dlc:string): PsnProfileTrophieEntry | undefined {
    const image = $(html).find('img').attr('src')
    const title = $(html).find(".title").text()
    const description = this.cleanText($($(html).find("td")[1]).text().replace(title, ''))
    const completed = $(html).attr('class') ? $(html).attr('class').includes('completed') : false

    const completionDate = completed ? $(html).find(".typo-top-date").text() : undefined
    const completionRate = $(html).find('.hover-show .rarity .typo-top').text()
    const rateTag = $(html).find('.hover-show .rarity .typo-bottom').text()
    const kind = $(html).find('td:last-child img').attr('title')
    

    if(!image) return
     
    return { image, title, description, completed, dlc, completionDate, completionRate, rateTag, kind };
  }
}

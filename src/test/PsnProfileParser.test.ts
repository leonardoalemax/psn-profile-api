import fs from "fs"
import { PsnProfileParser } from '../main/PsnProfileParser';
import profile from "./resources/profile-page-1.json"
describe('Testing PsnProfileParser', () => {
  describe('parseProfile', () => {
    test('should parse the pofile get result into a profile PsnProfileEntry', () => {
      let results = PsnProfileParser.parseProfile(profile.html, 'leonardoalemax');
      expect(results.name).toEqual("leonardoalemax");
      expect(results.games.length).toEqual(91);
      expect(results.games[0].title).toEqual("Alien: Isolation");
      expect(results.games[0].link).toEqual("/trophies/2967-alien-isolation/leonardoalemax");
    });
  });
  describe('parseGameDetail', () => {
    test('should parse the pofile get result into a profile PsnProfileEntry', () => {
      let detail = fs.readFileSync('src/test/resources/game-detail.html', 'utf-8');
      let results = PsnProfileParser.parseGameDetail(detail);
      expect(results.title).toEqual("Resident Evil 2");
      expect(results.trophies.length).toEqual(45);
      expect(results.trophies[0].title).toEqual("Raccoon City Native");
      expect(results.trophies[0].completed).toEqual(false);
    });
  });
});
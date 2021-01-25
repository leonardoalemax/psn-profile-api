import fs from "fs"
import PsnProfileService from '../main/PsnProfileService';
import profile1 from "./resources/profile-page-1.json";
import profile2 from "./resources/profile-page-2.json";
import profile3 from "./resources/profile-page-3.json";
import axios from "axios";
jest.mock('axios');

describe('Testing PsnProfileService', () => {
  describe('profile', () => {
    test('should get and parse profile from psnprofiles', async () => {
 
      (axios.get as any)
      .mockImplementationOnce(() => Promise.resolve({data:profile1}))
      .mockImplementationOnce(() => Promise.resolve({data:profile2}))
      .mockImplementationOnce(() => Promise.resolve({data:profile3}));
      
      const profile = await PsnProfileService.profile('leonardoalemax')
      
      expect(profile.name).toEqual("leonardoalemax");
      expect(profile.games.length).toEqual(184);
      expect(profile.games[0].title).toEqual("Alien: Isolation");
      expect(profile.games[0].link).toEqual("/trophies/2967-alien-isolation/leonardoalemax");
      expect(profile.games[profile.games.length-1].title).toEqual("Uncharted 3: Drake's Deception");
      expect(profile.games[profile.games.length-1].link).toEqual("/trophies/1126-uncharted-3-drakes-deception/leonardoalemax");
    });
  });

  describe('game', () => {
    test('should get and parse profile from psnprofiles', async () => {
      
      let detail = fs.readFileSync('src/test/resources/game-detail.html', 'utf-8');

      (axios.get as any)
      .mockImplementationOnce(() => Promise.resolve({data: detail}));
      
      const result = await PsnProfileService.game('/trophies/2967-alien-isolation/leonardoalemax')
      
      expect(result.title).toEqual("Resident Evil 2");
      expect(result.trophies.length).toEqual(45);
      expect(result.trophies[0].title).toEqual("Raccoon City Native");
      expect(result.trophies[0].completed).toEqual(false);
    });
  });
});
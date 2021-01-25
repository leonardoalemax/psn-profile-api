import { PsnProfileGameEntry } from "./PsnProfileGameEntry";

export interface PsnProfileEntry {
  name: string,
  games: Array<PsnProfileGameEntry>
}

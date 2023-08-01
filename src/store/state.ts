import type Player from './dto/player'
import type Role from './dto/role'

export const state: State = {
  players: [],
  roles: []
}
export type State = {
  players: Player[],
  roles: Role[]
}

import type Player from './dto/player'
import { type MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { type State } from './state'
import type Role from './dto/role'

export type Mutations<S = State> = {
  [MutationTypes.SET_PLAYERS](state: S, payload: Player[]): void
  [MutationTypes.SET_ROLES](state: S, payload: Role[]): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_PLAYERS](state, payload: Player[]) {
    state.players = payload
  },
  [MutationTypes.SET_ROLES](state, payload: Role[]) {
    console.log(payload);
    
    state.roles = payload
  }
}

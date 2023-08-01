import { type ActionTree, type ActionContext } from 'vuex'
import { type State } from './state'
import { type Mutations } from './mutations'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import axios from './axios-instance'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.UPDATE_PLAYERS]({ commit }: AugmentedActionContext): Promise<void>
  [ActionTypes.UPDATE_ROLES]({ commit }: AugmentedActionContext): Promise<void>
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.UPDATE_PLAYERS]: async ({ commit }) => {
    const data: any[] = (await axios.get("players")).data;
    commit(MutationTypes.SET_PLAYERS, data);
  },
  [ActionTypes.UPDATE_ROLES]: async ({ commit }) => {
    const data: any[] = (await axios.get("roles")).data;
    commit(MutationTypes.SET_ROLES, data.map(x => ({...x, faction: x.isMob ? "Mafia" : "Miasto"})));
  }
}

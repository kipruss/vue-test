import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  gifs: any[]
  foundGifs: any[]
  isFetched: boolean
  isSearchDone: boolean
  selectedPageNumber: number
  detailsById: byId
  searchTerm: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  strict: true,
  state: {
    gifs: [],
    foundGifs: [],
    isFetched: false,
    isSearchDone: false,
    selectedPageNumber: 0,
    detailsById: {},
    searchTerm: '',
  },
  mutations: {
    setGifs(state, gifs) {
      state.gifs = gifs
    },
    setFoundGifs(state, gifs) {
      state.foundGifs = gifs
    },
    setIsFetched(state, value) {
      state.isFetched = value
    },
    setIsSearchDone(state, value) {
      state.isSearchDone = value
    },
    setSelectedPageNumber(state, page) {
      state.selectedPageNumber = page
    },
    setDetailsById(state, { id, gif }) {
      state.detailsById[id] = gif
    },
    setSearchTerm(state, value) {
      state.searchTerm = value
    }
  }
})

export function useStore () {
  return baseUseStore(key)
}

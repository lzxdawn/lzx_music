import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/utils'

function findIndex(list, song) {
    return list.findIndex(item => {
        return item.id === song.id
    })
}

export const selectPlay = function({ commit, state }, { list, index }) {
    let newList = list.slice()
    commit(types.SET_SEQUENCE_LIST, newList)
    if (state.mode === playMode.random) {
        let randomList = shuffle(newList)
        commit(types.SET_PLAYLIST, randomList)
        index = findIndex(randomList, newList[index])
    } else {
        commit(types.SET_PLAYLIST, newList)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const searchPlay = function({ commit, state }, { list, index }) {
    let newList = list.slice()
    commit(types.SET_SEQUENCE_LIST, newList)
        // index = findIndex(newList, newList[index])
    commit(types.SET_CURRENT_INDEX, state.currentIndex)
    commit(types.SET_PLAYING_STATE, true)
}


export const randomPlay = function({ commit }, { list }) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
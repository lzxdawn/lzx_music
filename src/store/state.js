import { playMode } from 'common/js/config'

const state = {
    isLoading: false,
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1
}

export default state
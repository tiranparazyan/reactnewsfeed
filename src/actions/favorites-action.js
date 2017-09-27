export const FAVORITES_LIST = 'FAVORITES_LIST'

export function favoritesList (favorite) {

    return {
        type: FAVORITES_LIST,
        payload: favorite
    }
}
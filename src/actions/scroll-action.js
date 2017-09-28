export const HAS_SCROLLED = 'HAS_SCROLLED'

export function hasScrolled (pixels, currentPage) {

    return {
        type: HAS_SCROLLED,
        payload: pixels,
        currentPage
    }
}
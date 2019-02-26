/*
* localStorage
* */


const LocalStorage = {
    set(key, val) {
        localStorage.setItem(key, val)
    },
    get(key) {
        return localStorage.getItem(key)
    }
}

export default LocalStorage
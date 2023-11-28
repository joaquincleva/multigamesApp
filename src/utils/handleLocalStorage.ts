export const handleLocalStorage = (action: string, key="", value={}) => {
    if(action == "set"){
        window.localStorage.setItem(key, JSON.stringify(value))
    } else if(action == "get"){
        return window.localStorage.getItem(key)
    } else if(action == "remove"){
        window.localStorage.removeItem(key)
    } else if (action == "clear"){
        window.localStorage.clear()
    }
}
const generateId = () => {
    //sub eliminar los dos primeros caracteres
    const random =  Date.now().toString(32) + Math.random().toString(32).substring(2)
    return random
}

export default generateId
export const sortItems = (items) => {
    const orderedItems = items.sort()
    const finalItems = []
    for (let i=0; i<orderedItems.length; i++){
        if(orderedItems[i]!==orderedItems[i+1]){
            finalItems.push(orderedItems[i])
        }    
    }
    return finalItems
}
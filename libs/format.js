
  /**
  * Change field _to to id
  * @param {Object} obj it's target Object
  * @param {string} entity object instance
  * @returns {Object} transformed object
  */
 
exports.formatTo_id = entity => {
    //console.log(entity)
    if (!entity || typeof entity !== 'object') {
        return entity
    }

    let newArr = []

    for ( const property in entity ) {
        let newItem = {
            _id: property,
            ...entity[property]
        }
        newArr.push(newItem)
    }

    return newArr
 }
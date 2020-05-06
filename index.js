/**
  * @name Filterer
  * @author Chris Saretzky
  * @fileoverview
  * This library is used to filter arrays of complex test_data
  * using user provided functions
  */


function Filterer() {
  //The complete unfiltered data set
  this.complete_data = []

  //@type {{name: Object.<function, string>}}
  this.filters = {}
}
/**
  * Sets the complete unfiltered data set_complete_data
  * @param {Array.Object} an array of objects the filters will be applied to
  */
Filterer.prototype.set_complete_data = function(data) {
  if(!Array.isArray(data))  throw new TypeError("Function expects an array")
  if(data.length < 2)       throw new Error("Array does not contain enough data to filter")

  this.complete_data = data
  return true
}

/**
  * returns the array of complete data
  * @returns {Array.Object}
  */
Filterer.prototype.get_complete_data = function() {
  return this.complete_data
}

/**
  * returns the filters object
  * @returns {Object}
  */
Filterer.prototype.get_filters = function() {
  return this.filters
}

/**
  * Removes the matching key from the filters object
  * @param {String} the name of the filter you want removed
  */
Filterer.prototype.remove_filter = function(name) {
  if(!this.filters[name])       throw new Error("Invalid filter name")
  if(typeof(name) !== 'string') throw new Error('Invalid filter name')

  var filter = this.filters[name]
  delete this.filters[name]
  return filter
}

/**
  * Removes the matching key from the filters object
  * @param {String} the name of the filter you are adding
  * @param {Function} the provided function accepts a two objects as
  * arguments. One named data and the other named criteria. using
  * the criteria the function determinens wether the data object passes
  * if it passes the function returns true. The function must return a boolean
  * @param {Object} the criteria used to filter the data objects
  */
Filterer.prototype.add_filter = function(name, fn, criteria) {
  if(typeof(name) !== 'string' || name === '')
    {throw new Error('Invalid filter name')}
  if(typeof(fn) !== 'function')
    {throw new Error('Invalid function')}
  if(!criteria || typeof(criteria) === 'undefined')
    {throw new Error('Invalid criteria')}
  if(!fn.toString().match('(?<![\",\'])return true(?![\",\'])'))
    {throw new Error('Provided function must return true')}
  if(fn.toString().match('return (?![true, false])', "i"))
    {throw new Error('Provided function must only return a boolean value')}
  if(!fn.toString().match('\\([a-zA-z0-9]*,.[a-zA-z0-9]*\\)'))
    {throw new Error('Provided function must have two arguments, by convention use (data, criteria)')}

  this.filters[name] = {fn: fn, criteria: criteria}
  return true
}

/**
* Iterates through the complete data array, Applying only the specified filters
* @param {String} the name of the filter you are Applying
* @returns {Array} returns an array of the same type as the complete_data array
*/
Filterer.prototype.apply_filter = function(name) {
  if (this.filters[name] === undefined)
    {throw new Error('Invalid filter name')}
  if (this.complete_data.length < 2)
    {throw new Error('No data to filter')}

  var filtered_array = []
  this.get_complete_data().forEach((data) => {
    try{
      filter = this.filters[name]
      if (filter.fn(data, filter.criteria)){
        filtered_array.push(data)
      }
    }
    catch(err){
      throw new Error('provided function failed to execute' + err)
    }
  });
  return filtered_array
}

/**
* Iterates through the complete data array, Applying all get_filters
* @returns {Array} returns an array of the same type as the complete_data array
*/
Filterer.prototype.apply_filters = function() {
  if (this.complete_data.length < 2)
    {throw new Error('No data to filter')}

  var filtered_arry = []
  this.get_complete_data().forEach((data) => {
    var passed = true
    try{
      for(filter in this.get_filters()){
        filter = this.filters[filter]
        if(!filter.fn(data, filter.criteria)) passed = false
      }
    }
    catch(err){
      throw new Error('One or more filter functions failed to execute' + err)
    }
    if(passed) filtered_arry.push(data)
  })
  return filtered_arry
}

module.exports = Filterer

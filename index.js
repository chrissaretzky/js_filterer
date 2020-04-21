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
  if(typeOf(name) !== 'string') throw new Error('Invalid filter name')

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
  if(typeOf(name) !== 'string' || name = '') throw new Error('Invalid filter name')
  if(typeOf(fn) !== 'function')              throw new Error('invalid function')
  if(!criteria)                              throw new Error('Invalid criteria')
}

/**
* Iterates through the complete data array, Applying only the specified filters
* @param {String} the name of the filter you are Applying
* @returns {Array} returns an array of the same type as the complete_data array
*/
Filterer.prototype.apply_filter = function(name) {}

/**
* Iterates through the complete data array, Applying all get_filters
* @returns {Array} returns an array of the same type as the complete_data array
*/
Filterer.prototype.apply_filters = function() {}

module.exports = Filterer

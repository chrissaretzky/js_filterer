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
Filterer.prototype.set_complete_data = function(data) {}

/**
  * returns the array of complete data
  * @returns {Array.Object}
  */
Filterer.prototype.get_complete_data = function() {}

/**
  * returns the filters object
  * @returns {Object}
  */
Filterer.prototype.get_filters = function() {}

/**
  * Removes the matching key from the filters object
  * @param {String} the name of the filter you want removed
  */
Filterer.prototype.remove_filter = function(name) {}

/**
  * Removes the matching key from the filters object
  * @param {String} the name of the filter you are adding
  * @param {Function} the provided function accepts a two objects as
  * arguments. One named data and the other named criteria. using
  * the criteria the function determinens wether the data object passes
  * if it passes the function returns true. The function must return a boolean
  * @param {Object} the criteria used to filter the data objects
  */
Filterer.prototype.add_filter = function(name, fn, criteria) {}

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

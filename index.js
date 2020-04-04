/**
  * @name Filterer
  * @author Chris Saretzky
  * @fileoverview
  * This library is used to filter arrays of complex test_data
  * using user provided functions
  */


function Filterer() {
  //The complete unfiltered data set
  //Every function set in filters needs to accept this array as an argument
  this.complete_data = []

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
  * returns the array of complete data
  * @returns {Array.Object}
  */
Filterer.prototype.get_filters = function() {}
Filterer.prototype.remove_filter = function() {}
Filterer.prototype.add_filter = function() {}

Filterer.prototype.apply_filter = function() {}
Filterer.prototype.apply_filters = function() {}

function Filter() {

}

module.exports = Filterer

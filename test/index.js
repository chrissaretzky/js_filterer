var Filterer = require('../index')
var expect = require('chai').expect

describe('Filterer', function(){

  describe('#set_complete_data()', function() {
    context('when array is null or 1 in length', function(){
      it('should throw error' function(){})
    })
    context('when array is greater than 2', function(){
      it('it should return true' function(){})
    })
  })

  describe('#get_complete_data()', function() {
    context('when complete data array is not null', function(){
      it('should return an object of type array' function(){})
    })
    context('when complete data array is null', function(){
      it('should return null' function(){})
    })
  })

  describe('#get_filters()', function() {
    context('when filters are null', function(){
      it('should return null' function(){})
    })
    context('when filters are not null', function(){
      it('should return the filters object' function(){})
    })
  })

  describe('#remove_filter(name)', function() {
    context('when name argument is null or not a string', function(){
      it('should throw an error' function(){})
    })
    context('when name argument does not match a key in filters', function(){
      it('should throw an error' function(){})
    })
    context('when name argument matches a key in filters', function(){
      it('should return the filter' function(){})
      it('should remove the filter from the filters object' function(){})
    })
  })

  describe('#add_filter(name, fn(complete_data, criteria), criteria)', function() {
    context('when name is null or not a string', function(){
      it('should throw an error' function(){})
    })
    context('when fn argument is not a function', function(){
      it('should throw an error' function(){})
    })
    context('when criteria argument is null', function(){
      it('should throw an error' function(){})
    })
    context('when fn argument does not return an array', function(){
      it('should throw an error' function(){})
    })
    context('when fn argument has 0 or 1 param', function(){
      it('should throw an error' function(){})
    })
    context('when fn argument and data object are valid', function(){
      it('should return true' function(){})
    })
  })

  describe('#apply_filter(name)', function() {
    context('when filter name is null or not a string', function(){
      it('should throw error' function(){})
    })
    context('when filter name is not a key in the filter object', function(){
      it('should throw error' function(){})
    })
    context('when the complete_data array is empty', function(){
      it('should throw error' function(){})
    })
    context('when criteria argument is null', function(){
      it('should throw error' function(){})
    })
    context('when function fails to run', function(){
      it('should throw error' function(){})
      it('should show stacktrace in error' function(){})
    })
    context('when function filters no data', function(){
      it('should return null' function(){})
    })
    context('when function filters data successfully', function(){
      it('should return array' function(){})
      it('should return array greater than 1 in length' function(){})
      it('should return an array of the same type as the complete_data array' function(){})
    })
  })

  describe('#apply_filters()', function() {
    context('when the complete data array is empty', function(){
      it('should throw error' function(){})
    })
    context('when no data is filtered', function(){
      it('returns null' function(){})
    })
    context('when a filter function fails to run', function(){
      it('should throw an error' function(){})
      it('should continue to execute other filter functions' function(){})
      it('should include the name of failed filters in error message' function(){})
    })
    context('when data is filtered', function(){
      it('should return array' function(){})
      it('should return array greater than 1 in length' function(){})
      it('should return an array of the same type as the complete_data array' function(){})
    })
  })
})

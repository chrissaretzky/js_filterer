var Filterer = require('../index')
var expect = require('chai').expect

describe('Filterer', function(){
  beforeEach(function(){
    filterer = new Filterer()
  })

  describe('#set_complete_data()', function() {
    context('when array is null', function(){
      it('should throw error', function(){
        expect(() => {filterer.set_complete_data(null)}).to.throw(
          TypeError,
          'Function expects an array'
        )
      })
    })
    context('when array is less than or equal to one', function(){
      it('should throw error', function(){
        expect(() => {filterer.set_complete_data(['test'])}).to.throw(
          Error,
          'Array does not contain enough data to filter'
        )
      })
    })
    context('when array is greater than 2', function(){
      it('should return true', function(){
        expect(filterer.set_complete_data(['test', 'test1'])).to.be.true
      })
      it('should have placed the array in complete_data', function(){
        filterer.set_complete_data(['test', 'test1'])
        expect(filterer.complete_data).to.have.lengthOf(2)
      })
    })
  })

  describe('#get_complete_data()', function() {
    context('when complete data array is not null', function(){
      it('should return an object of type array', function(){
        filterer.complete_data = ['test', 'test2']
        expect(filterer.get_complete_data()).to.be.an.instanceof(Array)
      })
    })
    context('when complete data array is null', function(){
      it('should return null', function(){
        expect(filterer.get_complete_data()).to.be.empty
      })
    })
  })

  describe('#get_filters()', function() {
    context('when filters are null', function(){
      it('should return null', function(){
        expect(filterer.get_filters()).to.be.empty
      })
    })
    context('when filters are not null', function(){
      it('should return the filters object', function(){
        filterer.filters.test_filter = {fn: function(){}, criteria: 'test'}
        expect(filterer.get_filters()).to.have.key('test_filter')
      })
    })
  })

  describe('#remove_filter(name)', function() {
    context('when name argument not a string', function(){
      it('should throw an error', function(){
        expect(() => {filterer.remove_filter(null)}).to.throw(
          Error,
          'Invalid filter name'
        )
      })
    })
    context('when name argument does not match a key in filters', function(){
      it('should throw an error', function(){
        filterer.filters.test_filter = {fn: function(){}, criteria: 'test'}
        expect(() => {filterer.remove_filter('test')}).to.throw(
          Error,
          'Invalid filter name'
        )
      })
    })
    context('when name argument matches a key in filters', function(){
      it('should return the filter', function(){
        filterer.filters.test_filter = {fn: function(){}, criteria: 'test'}
        expect(filterer.remove_filter('test_filter')).to.have.keys('fn', 'criteria')
      })
      it('should remove the filter from the filters object', function(){
        filterer.filters.test_filter = {fn: function(){}, criteria: 'test'}
        filterer.remove_filter('test_filter')
        expect(filterer.filters).to.not.have.key('test_filter')
      })
    })
  })

  describe('#add_filter(name, fn(data, criteria), criteria)', function() {
    context('when name is null or not a string', function(){
      it('should throw an error', function(){
        expect(() => {filterer.add_filter(
          '',
          function(data, criteria){return true},
          {criteria: {name: 'test1'}}
        )}).to.throw(
          Error,
          'Invalid filter name'
        )
      })
    })
    context('when fn argument is not a function', function(){
      it('should throw an error', function(){
        expect(() => {filterer.add_filter(
          'test_filter',
          null,
          {criteria: {name: 'test1'}}
        )}).to.throw(
          Error,
          'Invalid function'
        )
      })
    })
    context('when criteria argument is null', function(){
      it('should throw an error', function(){
        expect(() => {filterer.add_filter(
          'test_filter',
          function(data, criteria){return (data === criteria.name) ? true : false},
          null
        )}).to.throw(
          Error,
          'Invalid criteria'
        )
      })
    })
    context('when fn argument does not return true', function(){
      it('should throw an error', function(){
        expect(() => {filterer.add_filter(
          'test_filter',
          function(data, criteria){return 1},
          {criteria: {name: 'test1'}}
        )}).to.throw(
          Error,
          'Provided function must return true'
        )
      })
    })
    context('when fn argument has 0 or 1 arguments', function(){
      it('should throw an error', function(){
        expect(() => {filterer.add_filter(
          'test_filter',
          function(criteria){return true},
          {criteria: {name: 'test1'}}
        )}).to.throw(
          Error,
          'Provided function must have two arguments, by convention use (data, criteria)'
        )
      })
    })
    context('when fn argument and data object are valid', function(){
      it('should return true', function(){
        expect(filterer.add_filter(
          'test_filter',
          function(data, criteria){return true},
          {criteria: {name: 'test1'}}
        )).to.be.true
      })
    })
  })

  describe('#apply_filter(name)', function() {
    context('when filter name is not a key in the filter object', function(){
      it('should throw error', function(){
        filterer.complete_data = ['test1', 'test2']
        filterer.filters.test_filter = {
          fn: function(data, criteria){return (data === criteria.name) ? true : false},
          criteria: {name: 'test1'}
        }
        expect(() => {filterer.apply_filter('filter_test')}).to.throw(
          Error,
          'Invalid filter name'
        )
      })
    })
    context('when the complete_data array is empty', function(){
      it('should throw error', function(){
        filterer.complete_data = []
        filterer.filters.test_filter = {
          fn: function(data, criteria){return (data === criteria.name) ? true : false},
          criteria: {name: 'test1'}
        }
        expect(() => {filterer.apply_filter('test_filter')}).to.throw(
          Error,
          'No data to filter'
        )
      })
    })
    context('when function fails to run', function(){
      it('should throw error', function(){
        filterer.complete_data = ['test1', 'test2']
        filterer.filters.test_filter = {
          fn: function(data, criteria){return (console.lag('wha?')) ? true : false},
          criteria: {name: 'test1'}
        }
        expect(() => {filterer.apply_filter('test_filter')}).to.throw(
          Error,
          'provided function failed to execute'
        )
      })
    })
    context('when function filters no data', function(){
      it('should return an empty array', function(){
        filterer.complete_data = ['test1', 'test2']
        filterer.filters.test_filter = {
          fn: function(data, criteria){return (data === criteria.name) ? true : false},
          criteria: {name: 'test3'}
        }
        expect(filterer.apply_filter('test_filter')).to.be.empty
      })
    })
    context('when function filters data successfully', function(){
      it('should return array of length 0 that includes the item test1', function(){
        filterer.complete_data = ['test1', 'test2']
        filterer.filters.test_filter = {
          fn: function(data, criteria){return (data === criteria.name) ? true : false},
          criteria: {name: 'test1'}
        }
        expect(filterer.apply_filter('test_filter'))
        .to.be.an.instanceof(Array)
        .that.has.a.lengthOf(1)
        .and.includes('test1')
      })
    })
  })

  describe('#apply_filters()', function() {
    context('when the complete data array is empty', function(){
      it('should throw error', function(){
        filterer.complete_data = []
        filterer.filters.test_filter1 = {
          fn: function(data, criteria){return (data.name === criteria.name) ? true : false},
          criteria: {name: 'test1'}
        }
        filterer.filters.test_filter2 = {
          fn: function(data, criteria){return (data.index === criteria.index) ? true : false},
          criteria: {index: 1}
        }
        expect(() => {filterer.apply_filters()}).to.throw(
          Error,
          'No data to filter'
        )
      })
    })
    context('when no data is filtered', function(){
      it('should return an empty array', function(){
        filterer.complete_data = [
          {name: 'test1', index: 0},
          {name: 'test2', index: 1},
          {name: 'test3', index: 2}
        ]
        filterer.filters.test_filter1 = {
          fn: function(data, criteria){return (data.name === criteria.name) ? true : false},
          criteria: {name: 'test4'}
        }
        filterer.filters.test_filter2 = {
          fn: function(data, criteria){return (data.index === criteria.index) ? true : false},
          criteria: {index: 3}
        }
        expect(filterer.apply_filters()).to.be.empty
      })
    })
    context('when a filter function fails to run', function(){
      it('should throw an error', function(){
        filterer.complete_data = [
          {name: 'test1', index: 0},
          {name: 'test2', index: 1},
          {name: 'test3', index: 2}
        ]
        filterer.filters.test_filter1 = {
          fn: function(data, criteria){console.lag('wha?')},
          criteria: {name: 'test4'}
        }
        filterer.filters.test_filter2 = {
          fn: function(data, criteria){console.lag('wha?')},
          criteria: {index: 3}
        }
        expect(() => {filterer.apply_filters()}).to.throw(
          Error,
          'One or more filter functions failed to execute'
        )
      })
      // it('should include the name of failed filters in error message', function(){})
    })
    context('when data is filtered', function(){
      it('should return array on length 1', function(){
        filterer.complete_data = [
          {name: 'test1', index: 0},
          {name: 'test2', index: 1},
          {name: 'test3', index: 2}
        ]
        filterer.filters.test_filter1 = {
          fn: function(data, criteria){if (data.name === criteria.name){
            return true
          }},
          criteria: {name: 'test2'}
        }
        filterer.filters.test_filter2 = {
          fn: function(data, criteria){if (data.index === criteria.index){
            return true
          }},
          criteria: {index: 1}
        }
        expect(filterer.apply_filters())
        .to.be.an.instanceof(Array)
        .that.has.a.lengthOf(1)
        //.and.includes({name: 'test2', index: 1})
      })
    })
  })
})

"use strict"

import chai from 'chai'
import TripService from '../src/TripService.js'
import sinon from 'sinon'
import User from '../src/User.js'
const {stub} = sinon
const {expect} = chai

describe('TripService', () => {

    it('should fail when given a null parameter', () => {
        const userSession = {getLoggedUser: stub()}
        const tripService = new TripService(userSession)

        expect(() => tripService.getTripsByUser(null)).to.throw('User not logged in.')
    })

    it('should return empty list when connected user is not a friend', () => {
        const userSession = {getLoggedUser: stub().returns(new User())}
        const tripService = new TripService(userSession)

        const tripList = tripService.getTripsByUser(new User())

        expect(tripList).to.deep.equal([])
    })

})

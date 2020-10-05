"use strict"

import chai from 'chai'
import TripService from '../src/TripService.js'
import sinon from 'sinon'
const {stub} = sinon
const {expect} = chai

describe('TripService', () => {

    it('should fail when given a null parameter', () => {
        const userSession = {getLoggedUser: stub()}
        const tripService = new TripService(userSession)

        expect(() => tripService.getTripsByUser(null)).to.throw('User not logged in.')
    })

})

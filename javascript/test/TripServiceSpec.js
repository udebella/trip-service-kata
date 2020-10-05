"use strict"

import chai from 'chai'
import sinon from 'sinon'
import User from '../src/User.js'
import {tripsFinder} from '../src/TripService.js'

const {stub} = sinon
const {expect} = chai

describe('TripService', () => {
    let tripService, stubs
    beforeEach(() => {
        stubs = {
            getLoggedUser: stub(),
            findTripsByUser: stub(),
        }
        tripService = tripsFinder(stubs)
    })

    it('should fail when given a null parameter', () => {
        expect(() => tripService.getTripsByUser(null)).to.throw('User not logged in.')
    })

    it('should return empty list when connected user is not a friend', () => {
        stubs.getLoggedUser.returns(new User())

        const tripList = tripService.getTripsByUser(new User())

        expect(tripList).to.deep.equal([])
    })

    it('should return trip list when connected user is a friend', () => {
        const connectedUser = new User();
        stubs.getLoggedUser.returns(connectedUser)
        stubs.findTripsByUser.returns(['Paris'])

        const tripList = tripService.getTripsByUser(new User([connectedUser]))

        expect(tripList).to.deep.equal(['Paris'])
    })

})

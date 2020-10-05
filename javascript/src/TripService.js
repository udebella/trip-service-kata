"use strict"

import UserSession from './UserSession.js'
import TripDAO from './TripDAO.js'
const DEFAULT_DEPENDENCIES = {
    getLoggedUser: UserSession.getLoggedUser,
    findTripsByUser: TripDAO.findTripsByUser
}

const compose = (...functions) => arg => functions.reduce((acc, fn) => fn(acc, arg), arg)

const ifConnected = loggedUser => {
    if (!loggedUser) {
        throw new Error('User not logged in.')
    }
    return loggedUser
}

export function TripService({getLoggedUser, findTripsByUser} = DEFAULT_DEPENDENCIES) {
    const retrieveTripsIfAuthorized = (loggedUser, user) => user
        .getFriends()
        .filter(friend => friend === loggedUser)
        .flatMap(_ => findTripsByUser(user))

    return {
        getTripsByUser: compose(
            getLoggedUser,
            ifConnected,
            retrieveTripsIfAuthorized)
    }
}
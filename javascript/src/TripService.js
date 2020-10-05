"use strict"

import UserSession from './UserSession.js'
import TripDAO from './TripDAO.js'
const DEFAULT_DEPENDENCIES = {
    getLoggedUser: UserSession.getLoggedUser,
    findTripsByUser: TripDAO.findTripsByUser
}

const compose = (...functions) => arg => functions.reduce((acc, fn) => fn(acc), arg)

const ifConnected = loggedUser => {
    if (!loggedUser) {
        throw new Error('User not logged in.')
    }
    return loggedUser
}

export function TripService({getLoggedUser, findTripsByUser} = DEFAULT_DEPENDENCIES) {
    return {
        getTripsByUser: user => compose(
            getLoggedUser,
            ifConnected,
            loggedUser => user
                .getFriends()
                .filter(friend => friend === loggedUser)
                .flatMap(_ => findTripsByUser(user)))(user)
    }
}
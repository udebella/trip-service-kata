"use strict"

import UserSession from './UserSession.js'
import TripDAO from './TripDAO.js'

const ifConnected = (getLoggedUser) => ({
    then: callBack => {
        const loggedUser = getLoggedUser()
        if (!loggedUser) {
            throw new Error('User not logged in.')
        }
        return callBack(loggedUser)
    }
})

export function TripService({getLoggedUser = UserSession.getLoggedUser, findTripsByUser = TripDAO.findTripsByUser} = {}) {
    return {
        getTripsByUser: user => ifConnected(getLoggedUser)
            .then(loggedUser => user
                .getFriends()
                .filter(friend => friend === loggedUser)
                .flatMap(_ => findTripsByUser(user)))
    }
}
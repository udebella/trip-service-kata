"use strict"

import UserSession from './UserSession.js'
import TripDAO from './TripDAO.js'

export function TripService({getLoggedUser = UserSession.getLoggedUser, findTripsByUser = TripDAO.findTripsByUser} = {}) {
    const ifConnected = () => ({
        then: callBack => {
            const loggedUser = getLoggedUser()
            if (!loggedUser) {
                throw new Error('User not logged in.')
            }
            return callBack(loggedUser)
        }
    })

    const getTripsByUser = user => ifConnected()
        .then(loggedUser => user
            .getFriends()
            .filter(friend => friend === loggedUser)
            .flatMap(_ => findTripsByUser(user)))

    return {
        getTripsByUser
    }
}
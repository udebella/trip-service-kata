"use strict"

import UserSession from './UserSession.js'
import TripDAO from './TripDAO.js'

export function TripService({getLoggedUser = UserSession.getLoggedUser, findTripsByUser = TripDAO.findTripsByUser} = {}) {
    const failIfNotConnected = () => {
        const loggedUser = getLoggedUser()
        if (!loggedUser) {
            throw new Error('User not logged in.')
        }
        return loggedUser;
    }

    function getTripsByUser(user) {
        const loggedUser = failIfNotConnected();

        return user
            .getFriends()
            .filter(friend => friend === loggedUser)
            .flatMap(_ => findTripsByUser(user))
    }

    return {
        getTripsByUser
    }
}
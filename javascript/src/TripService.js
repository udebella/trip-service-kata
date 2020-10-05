"use strict"

import UserSession from './UserSession.js'
import TripDAO from './TripDAO.js'

export const tripsFinder = ({userSession, tripDao = TripDAO, getLoggedUser = UserSession.getLoggedUser} = {}) => {
    function getTripsByUser(user) {
        const loggedUser = userSession ? userSession.getLoggedUser() : getLoggedUser()
        if (!loggedUser) {
            throw new Error('User not logged in.')
        }

        return user
            .getFriends()
            .filter(friend => friend === loggedUser)
            .flatMap(_ => tripDao.findTripsByUser(user))
    }

    return {
        getTripsByUser
    }
}
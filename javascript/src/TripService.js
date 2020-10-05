"use strict"

import UserSession from './UserSession.js'
import TripDAO from './TripDAO.js'

export const tripsFinder = ({tripDao, getLoggedUser = UserSession.getLoggedUser, findTripsByUser = TripDAO.findTripsByUser} = {}) => {
    function getTripsByUser(user) {
        const loggedUser = getLoggedUser()
        if (!loggedUser) {
            throw new Error('User not logged in.')
        }

        return user
            .getFriends()
            .filter(friend => friend === loggedUser)
            .flatMap(_ => tripDao ? tripDao.findTripsByUser(user) : findTripsByUser(user))
    }

    return {
        getTripsByUser
    }
}
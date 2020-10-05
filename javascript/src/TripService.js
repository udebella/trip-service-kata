"use strict"

import UserSession from './UserSession.js'
import TripDAO from './TripDAO.js'

class Service {
    constructor(userSession = UserSession, tripDao = TripDAO) {
        this.userSession = userSession;
        this.tripDao = tripDao;
    }

    getTripsByUser(user) {
        const loggedUser = this.userSession.getLoggedUser()
        if (!loggedUser) {
            throw new Error('User not logged in.')
        }

        return user
            .getFriends()
            .filter(friend => friend === loggedUser)
            .flatMap(_ => this.tripDao.findTripsByUser(user))
    }
}

export const tripsFinder = ({userSession = UserSession, tripDao = TripDAO} = {}) => {
    function getTripsByUser(user) {
        const loggedUser = userSession.getLoggedUser()
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

export default Service

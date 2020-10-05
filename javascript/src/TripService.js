"use strict"

import UserSession from './UserSession.js'
import TripDAO from './TripDAO.js'

class TripService {
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

export default TripService

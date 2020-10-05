"use strict"

import UserSession from './UserSession.js'
import TripDAO from './TripDAO.js'

class TripService {
    constructor(userSession = UserSession, tripDao = TripDAO) {
        this.userSession = userSession;
        this.tripDao = tripDao;
    }

    getTripsByUser(user) {
        let tripList = []
        let loggedUser = this.userSession.getLoggedUser()
        if (loggedUser == null) {
            throw new Error('User not logged in.')
        }

        let friends = user.getFriends()
        const isFriend = friends.some(friend => friend === loggedUser)
        if (isFriend) {
            tripList = this.tripDao.findTripsByUser(user)
        }
        return tripList
    }
}

export default TripService

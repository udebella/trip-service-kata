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
        let isFriend = false
        if (loggedUser == null) {
            throw new Error('User not logged in.')
        }

        let friends = user.getFriends()
        for (let i = 0; i < friends.length; i++) {
            let friend = friends[i]
            if (friend == loggedUser) {
                isFriend = true
                break
            }
        }
        if (isFriend) {
            tripList = this.tripDao.findTripsByUser(user)
        }
        return tripList
    }
}

export default TripService

"use strict"

export default function User(friends = []) {
    const getFriends = () => {
        return friends
    }
    return {getFriends}
}
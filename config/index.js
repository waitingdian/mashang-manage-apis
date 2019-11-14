'use strict';

module.exports = {
    url: 'mongodb://localhost:27017/mashang',
    session: {
        name: 'SID',
        secret: 'SID',
        cookie: {
            httpOnly: true,
            secure:   false,
            maxAge:   365 * 24 * 60 * 60 * 1000,
        }
    }
}
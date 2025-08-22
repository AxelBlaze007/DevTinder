## AuthRouter

    -post(/auth/login)
    -post(/auth/signup)
    -post(/auth/logout)

## ProfileRouter

    -get(/profile/view)
    -patch(/profile/edit)
    -patch(/profile/password)

## connectionRequests

    -post(/request/send/intrested/:userId)
    -post(/request/send/ignored/:userId)
    -get(/reques/review/accepted/:userId)
    -get(/request/review/rejected/:userId)

import withSession from '../../lib/session'

// overriding the function withSession
export default withSession(async (req, res) => {
  // this is what the cookie is called on the backend?
  const user = req.session.get('user')

  if (user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    
    res.json({
      isLoggedIn: true,
      Hello: 'yes',
      ...user,
    })
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
})

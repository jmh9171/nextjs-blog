import {
    query
} from '../../lib/db'
import withSession from '../../lib/session'
/**
 * @param  {} req - request
 * @param  {} res - response
 */
export default withSession(async (req, res) => {

    if (!req.body.cook) {
        return res.status(200)
            .json({
                message: 'no session available'
            })
    }

    try {

        // get the id associated with the session
        const userID = await query(
            `SELECT id FROM userSession WHERE sesh = ?`,
            [req.body.cook]
        )

        if (!userID[0]) {
            console.log("get-userdata API")
            return res.status(200)
                .json({
                    message: 'no session available'
                })
        }

        const userInfo = await query(
            `SELECT username, description FROM user WHERE user_id = ?`,
            [userID[0].id]
        )

        const userGames = await query(
            `SELECT game FROM userGames WHERE id = ?`,
            [userID[0].id]
        )

        return res.status(200)

            .json({
                userID: userID[0].id,
                userInfo: userInfo,
                userGames: {
                    userGames
                }
            })

    } catch (e) {
        console.log("get-userdata API: ", e.message)
        return res.status(500)
            .json({
                message: e.message
            })
    }
})
require("dotenv").config()
const fetch = require("node-fetch")
const crypto = require("crypto")

const epoch = Math.floor(Date.now() / 1000)

const signature = (apiKey) =>
    crypto
        .createHash("sha256")
        .update(`${process.env.WDScret}:${apiKey}:${epoch}`)
        .digest("hex")
const headers = (apiKey) => ({
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "X-WarDragons-APIKey": apiKey,
        "X-WarDragons-Request-Timestamp": epoch,
        "X-WarDragons-Signature": signature(apiKey),
    },
})
const generateFetch = (target, apiKey) =>
    fetch(
        `https://api-dot-pgdragonsong.appspot.com/api/v1/atlas/${target}`,
        headers(apiKey)
    ).then((res) => res.json())

const getTeamName = (apiKey) =>
    generateFetch("team/contribution", apiKey)
        .then(({ entries }) =>
            entries.reduce((prev, { for_name }) => [...prev, for_name], [])
        )
        .then((teamMembers) =>
            generateFetch("team/battles", apiKey).then(({ reports }) => ({
                teamName: teamMembers.includes(reports[0].defender.name)
                    ? reports[0].defender.team
                    : reports[0].attacker.team,
            }))
        )

const getUserName = (apiKey) =>
    generateFetch("player/event/score", apiKey).then((res) => ({
        playerName: res[0].player_name,
    }))

exports.handler = async function (event) {
    const { apiKey } = JSON.parse(event.body)
    console.log(apiKey, process.env.WDSecret)
    //hoge
    return Promise.all([getUserName(apiKey), getTeamName(apiKey)])
        .then((results) =>
            results.reduce(
                (prev, current) => ({
                    ...prev,
                    ...current,
                }),
                {}
            )
        )
        .then((result) => ({
            statusCode: 200,
            body: JSON.stringify(result),
        }))
        .catch((err) => {
            console.log(err)
            return {
                statusCode: 500,
                body: JSON.stringify(err),
            }
        })
}

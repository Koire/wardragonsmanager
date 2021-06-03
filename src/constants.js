export const BaseURL = process.env.NODE_ENV == "production" ?  "https://vaiarmorghuiis.netlify.app" : "http://localhost:9095"
export const FunctionsURL = `${BaseURL}/.netlify/functions`
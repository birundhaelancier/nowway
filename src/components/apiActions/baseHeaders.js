export const APIURL ="https://nowway.in/$panel/api/";
export const REQUEST_HEADERS = {
    Authorization: 'Bearer' + JSON.parse(localStorage.getItem("Token")),

    
    // 'Access-Control-Allow-Origin': '*',
    // " Content-Length": 0,
    // //    "Host":<calculated when request is sent></calculated>
    // "User-Agent": "PostmanRuntime/7.29.0",
    // "Accept": "*/*",
    // "Accept-Encoding": "gzip, deflate, br",
    // "Connection": "keep-alive"
}


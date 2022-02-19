export const APIURL = "https://elancier.in/nowway/api/";
export const REQUEST_HEADERS = {
    Authorization: 'Bearer' + JSON.parse(localStorage.getItem("Token")),
}
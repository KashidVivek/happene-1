var request = require('request')
function getlonglat(locStr) {
    const options = {
        url: 'https://api.radar.io/v1/geocode/forward?query=' + `${locStr}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Request',
            'Authorization': 'prj_test_sk_5b8c3605cd4bf4e7103af4e14b03aef56c120346'
        }
    };
    var settings = {
        // "async": true,
        // "crossDomain": true,
        url: "https://api.radar.io/v1/geocode/forward",
        method: "GET",
        headers: {
            "Authorization": "prj_test_sk_5b8c3605cd4bf4e7103af4e14b03aef56c120346",
            "content-type": "application/x-www-form-urlencoded",
            // "query": `${locStr}`
            //   "cache-control": "no-cache",
        },
        qs: {
            q: `${locStr}`
        }
        // query: 
    }
    //   $.ajax(settings).done(function (response) {
    //     // console.log(response);
    //     const lat =response.addresses[0].geometry.coordinates
    //     console.log(lat)
    //     return lat
    // });
    return new Promise((resolve,reject) => {
        request.get(options, function (error, response, body) {
            // console.log(res.addresses[0].geometry.coordinates)
            body = JSON.parse(body)
            resolve(body)
        })
    })
}
exports = module.exports = {
    getlonglat
}
// console.log(getlonglat("gainesville, fl"),getlonglat("boston, ma"))
// getlonglat("Shoot GTR (Gainesville Target Range), 1610 NW 65 Pl,Gainesv..")
// const ret = getlonglat("Shoot GTR (Gainesville Target Range), 1610 NW 65 Pl,Gainesv..")
//     .then((data) =>{
//         console.log(data)
//     })




// { "meta": { "code": 200 }, "addresses": [{ "latitude": 38.75967, "longitude": -77.57563, "geometry": { "type": "Point", "coordinates": [-77.57563, 38.75967] }, "country": "United States", "countryCode": "US", "countryFlag": "🇺🇸", "confidence": "  fallback", "city": "Bristow", "number": "9050", "postalCode": "20136", "stateCode": "VA", "state": "Virginia", "street": "Devlin Rd", "layer": "place", "formattedAddress": "9050 Devlin Rd, Bristow, VA 20136 USA", "addressLabel": "9050 Devlin Rd" }] }
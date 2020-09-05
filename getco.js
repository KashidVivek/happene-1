
function getlonglat(locStr) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.radar.io/v1/geocode/forward",
        "method": "GET",
        "headers": {
            "Authorization": "prj_test_sk_5b8c3605cd4bf4e7103af4e14b03aef56c120346",
            "content-type": "application/x-www-form-urlencoded",
            //   "cache-control": "no-cache",
        },
        "data": {
            "query": `${locStr}`
        }
    }
      const lat= ""
      $.ajax(settings).done(function (response) {
        // console.log(response);
        const lat =response.addresses[0].geometry.coordinates
        console.log(lat)
    });
    
}
console.log(getlonglat("gainesville, fl"),getlonglat("boston, ma"))
getlonglat("Shoot GTR (Gainesville Target Range), 1610 NW 65 Pl,Gainesv..")
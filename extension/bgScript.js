console.log("BG SCRIPT")

// dont mind me stealing some code mmmm
// https://stackoverflow.com/questions/50771902/chrome-cookies-getall-returns-an-empty-array
chrome.runtime.onMessage.addListener(function (message, sender, callback) {
    if (message.command === 'GetCookies') {
      
        checkKnownCookies()
        callback(cookies)

        // cookies.filter(function(item) {
        //     return (item.domain.includes("print"));
        // });
        //
        // for (cookie of cookies) {
        //
        //   // $.get( "localhost:3000/report-a-bug/BUGGYBOY", ()=>{});
        //   fetch('http://localhost:3000/report-a-bug/'+cookie, {mode:'cors'})
        //
        // }

    }
});
let cookies = [] // Hold IDs of recognized cookies
function checkKnownCookies() {
    chrome.cookies.getAll({
    }, function (theCookies) {
        cookies = theCookies.filter(function(item) {
            return (item.domain.includes("print.mit"));
        });
        console.log(cookies)
        callback(theCookies)
    });
}

// TODO: fix this sketchy thing later

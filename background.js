banned = ["https://www.facebook.com", "https://facebook.com",
		"https://www.youtube.com", "https://youtube.com",
		"https://www.twitter.com", "https://twitter.com",
		"https://www.reddit.com", "https://reddit.com", "www.reddit.com", "reddit.com"];

links = ["http://i.imgur.com/7aNla4Q.png", "http://i.imgur.com/FdXfcYX.jpg?1", "http://i.imgur.com/Bl5uPIu.jpg"];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	check();
});

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {         
	check();
});

function check(){	
	chrome.tabs.getAllInWindow(null, function(tabs){
		tabs.forEach(function(tab){
			if(isBanned(tab.url)) yo(api_token);
		});
	});
}

function isBanned(tablink) {
	if(banned.indexOf(tablink)!=-1){
		//oNewNode.innerText = tablink + " banned";
		return true;
	}
	return false;
}

/*
function addToList(tablink){
	var oNewNode = document.createElement("LI");
    urlList.appendChild(oNewNode);
    oNewNode.innerText=tablink; 
}
*/

/*
function getLink(){
	for(int i=0; i<links.length; i++){
		return links[Math.floor(Math.random() * myArray.length)];
	}
}
*/

function yo(api_token) {
	xhr = new XMLHttpRequest();
	params = "api_token=" + api_token + "&username=" + yoname + "&link=" + getLink(); 
	xhr.open("POST", "http://api.justyo.co/yo/", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("Content-length", params.length);
	xhr.send(params);
}

//***************FIRST TIME RUN***************\\

function onInstall() {
    console.log("Extension Installed");
    getCredentials();
  }

function onUpdate() {
	console.log("Extension Updated");
	getCredentials();
}

function getCredentials(){
	yoname = document.getElementById("username").value
}

function getVersion() {
	var details = chrome.app.getDetails();
	return details.version;
}

// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage['version']
if (currVersion != prevVersion) {
	if (typeof prevVersion == 'undefined') {
  		onInstall();
	} else {
 		onUpdate();
	}
	localStorage['version'] = currVersion;
}


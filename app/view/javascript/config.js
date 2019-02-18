var login = {
   redirectTarget: "/app/view/html/index.html#/map",
   expiry:6,
   loginTarget: "/app/view/html/login.html",
   loginApi: "/app/api/login/login",
   validateTokenApi: "/app/api/login/validateToken"
};

var wssConfig = ["wsClientProvider",function (wsClientProvider) {
    wsClientProvider.setPublishChannel("requestChannel");
    var subscribeChannels = ["responseChannel"]
    wsClientProvider.setSubscribeChannel(subscribeChannels);
}];

var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
}]





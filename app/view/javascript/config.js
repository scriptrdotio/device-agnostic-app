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
    var userGroups = JSON.parse($.cookie('user')).groups;
    var groups = (userGroups)? ((typeof userGroups == 'string') ?  [userGroups] : userGroups) :[];
    groups.forEach(function(value){
        subscribeChannels.push("responseChannel_"+value);
    })
    wsClientProvider.setSubscribeChannel(subscribeChannels);
}];

var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
}]





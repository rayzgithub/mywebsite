MySocket = Class({
	name: "mySocket",	
	module: "mySocket",
	socket:null,
	logFlag:false,
    loginSign:'',
	onmessage:null,
	ip: wsip || null,
	initialize: function (options) {
	},
	/**
	 * 连接
	 * @param String uid 用户ID
	 */	
	connect:function(uid){
		if(!this.ip) return null;
		socket = new WebSocket(this.ip);
		this.socket=socket;	
		if(uid) this.login(uid,loginSign);
		this.socket.onclose = function() {
			if(mySocket.logFlag) console.log("关闭连接");
            mySocket.connect(uid);
    	};
        setInterval(function(){
            mySocket.socket.send('@heart_pc');
        },1000);
	},
	/**
	 * 登陆
	 * @param String uid 用户ID
	 */	
	login:function(uid){
		if(!this.socket || !uid) return '';
		this.socket.onopen = function(){
			if(mySocket.logFlag) console.log("连接成功...");
			socket.send('{"action":"login","userid":"'+uid+'","loginSign":"'+mySocket.loginSign+'"}');
    	};		
	},
	/**
	 * 发送消息
	 * @param String userid 用户ID
	 * @param String msg 内容
	 * @param String operate 操作参数
	 * mySocket.sendMsg('test',2);
	 */	
	sendMsg:function(msg,userid,operate){
		if(!mySocket.socket || !msg) return '';
		if(!operate) operate='';
		mySocket.socket.send('{"action":"sendMsg","loginSign":"'+mySocket.loginSign+'","operate":"'+operate+'","msg":"'+msg+'","userid":"'+userid+'","sendUserid":"'+uid+'"}');
	},
	
	CLASS_NAME: "MySocket"
});
var mySocket = new MySocket();
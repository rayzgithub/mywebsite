MySocket = {
	name: "mySocket",	
	module: "mySocket",
	socket:null,
	logFlag:false,
    loginSign:'',
	onmessage:null,
	uuid:'',
	uname:'',
	ip: 'ws://182.61.35.125:8690',
	initialize: function (options) {
	},
	/**
	 * 连接
	 * @param String uid 用户ID
	 */	
	connect:function(){
		if(!this.ip) return null;
		socket = new WebSocket(this.ip);
		this.socket=socket;
		this.init();
        // this.socket.onclose = function() {
			// if(mySocket.logFlag) console.log("关闭连接");
        //     mySocket.connect(uid);
        // };
        // setInterval(function(){
        //     mySocket.socket.send('@heart_pc');
        // },1000);
	},
	/**
	 * 登陆
	 * @param String uid 用户ID
	 */
	init:function(){
		if(!this.socket) return '';
		var userinfo = this.get_user_info();
        var uuid = userinfo.uuid;
		var uname = userinfo.uname;
		var avatar = userinfo.avatar;
		this.uuid = uuid;
		this.uname = uname;
        this.avatar = avatar;
		var _this = this;
		this.socket.onopen = function(){
            _this.send('init',{sign:userinfo.sign});
    	};
	},
	get_user_info:function(){
        var user_info = this.getStorage('user_info');
        if(!user_info) {
            uuid = this.create_uuid(32);
            user_info = {
            	uuid:uuid,
				uname:this.create_uname(),
				sign:'忧伤的签名',
				avatar:'wp-content/themes/layui/images/avatar/avatar_' + Math.ceil(Math.random()*8) + '.jpg'
			};
            this.setStorage('user_info',JSON.stringify(user_info));
        }else{
        	user_info = JSON.parse(user_info);
		}
		return user_info;
	},
	send:function(action,data = {}){
		var req = $.extend({uuid:this.uuid,uname:this.uname,avatar:this.avatar},data);
		send_data = {
			action:action,
			data:req
		};
		send_data = JSON.stringify(send_data);
		console.log(send_data);
		this.socket.send(send_data);
	},
	/**
	 * 发送消息
	 * @param String userid 用户ID
	 * @param String msg 内容
	 * @param String operate 操作参数
	 * mySocket.sendMsg('test',2);
	 */	
	sendMsg:function(to,msg){
		if(!mySocket.socket || !msg) return '';
		var data = {msg:msg,to:to};
		this.send('client_msg',data);
	},
	setStorage:function(name,val){
        localStorage.setItem(name,val);
	},
    /**
	 * 获取localstorage中存储的值
     * @param name
     */
	getStorage:function(name){
        return localStorage.getItem(name);
	},
    create_uname:function(){
        return '用户' + Math.ceil(Math.random() * 1000000) + '号';
    },
    /**
	 * 生成uuid的方法
     * @param len
     * @param radix
     * @returns {string}
     */
	create_uuid:function(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('').toLocaleLowerCase();
    },
	onmessage:function(){

	},

	CLASS_NAME: "MySocket"
};
var mySocket = MySocket;
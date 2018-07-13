layui.use('layim', function(){

    var layim = layui.layim;

    var tmp_group = {
        name: '临时群组',
        type: 'group',
        avatar: 'wp-content/themes/layui/images/avatar/group_default.png',
        id: 10000
    };

    //演示自动回复
    var autoReplay = [
        '您好，我现在有事不在，一会再和您联系。',
        '你没发错吧？face[微笑] ',
        '洗澡中，请勿打扰，偷窥请购票，个体四十，团体八折，订票电话：一般人我不告诉他！face[哈哈] ',
        '你好，我是主人的美女秘书，有什么事就跟我说吧，等他回来我会转告他的。face[心] face[心] face[心] ',
        'face[威武] face[威武] face[威武] face[威武] ',
        '<（@￣︶￣@）>',
        '你要和我说话？你真的要和我说话？你确定自己想说吗？你一定非说不可吗？那你说吧，这是自动回复。',
        'face[黑线]  你慢慢说，别急……',
        '(*^__^*) face[嘻嘻] ，是贤心吗？'
    ];

    //基础配置
    layim.config({
        //初始化接口
        init: {
            url: '/wp-content/themes/layui/json/getList.json'
            ,data: {}
        }
        //查看群员接口
        ,members: {
            url: '/wp-content/themes/layui/json/getMembers.json'
            ,data: {}
        }

        ,uploadImage: {
            url: '' //（返回的数据格式见下文）
            ,type: '' //默认post
        }
        ,uploadFile: {
            url: '' //（返回的数据格式见下文）
            ,type: '' //默认post
        }

        ,isAudio: false //开启聊天工具栏音频
        ,isVideo: false //开启聊天工具栏视频

        //扩展工具栏
        ,tool: [{
            alias: 'code'
            ,title: '代码'
            ,icon: '&#xe64e;'
        }]

        ,brief: true //是否简约模式（若开启则不显示主面板）

        //,title: 'WebIM' //自定义主面板最小化时的标题
        //,right: '100px' //主面板相对浏览器右侧距离
        //,minRight: '90px' //聊天面板最小化时相对浏览器右侧距离
        ,initSkin: '3.jpg' //1-5 设置初始背景
        //,skin: ['aaa.jpg'] //新增皮肤
        //,isfriend: false //是否开启好友
        //,isgroup: false //是否开启群组
        //,min: true //是否始终最小化主面板，默认false
        //,notice: true //是否开启桌面消息提醒，默认false
        //,voice: false //声音提醒，默认开启，声音文件为：default.mp3

        ,msgbox: 'http://www.layui.com/layim/demo/msgbox.html' //消息盒子页面地址，若不开启，剔除该项即可
        ,find: 'http://www.layui.com/layim/demo/find.html' //发现页面地址，若不开启，剔除该项即可
        ,chatLog: 'http://www.layui.com/layim/demo/chatlog.html' //聊天记录页面地址，若不开启，剔除该项即可

    });
    //监听在线状态的切换事件
    layim.on('online', function(status){
        layer.msg(status);
    });

    //监听签名修改
    layim.on('sign', function(value){
        layer.msg(value);
    });
    //监听自定义工具栏点击，以添加代码为例
    layim.on('tool(code)', function(insert){
        layer.prompt({
            title: '插入代码 - 工具栏扩展示例'
            ,formType: 2
            ,shade: 0
        }, function(text, index){
            layer.close(index);
            insert('[pre class=layui-code]' + text + '[/pre]'); //将内容插入到编辑器
        });
    });

    //监听layim建立就绪
    layim.on('ready', function(res){
        //console.log(res.mine);
        // layim.msgbox(5); //模拟消息盒子有新消息，实际使用时，一般是动态获得
    });
    //监听发送消息
    layim.on('sendMessage', function(data){
        console.log(data);
        mySocket.send('send_msg_all',{msg:data.mine.content});

    });
    //监听查看群员
    layim.on('members', function(data){
        //console.log(data);
    });

    //监听聊天窗口的切换
    layim.on('chatChange', function(res){
        var type = res.data.type;
        console.log(res.data.id)
        if(type === 'friend'){
            //模拟标注好友状态
            //layim.setChatStatus('<span style="color:#FF5722;">在线</span>');
        } else if(type === 'group'){

        }
    });


    $('.site-demo-layim').on('click', function(){
        layim.chat(tmp_group);
        // var type = $(this).data('type');
        // active[type] ? active[type].call(this) : '';
    });


    //开启socket
    mySocket.logFlag=true;
    mySocket.connect();
    if(mySocket.socket){
        mySocket.socket.onmessage=function(res) {
            try{
                var res=jQuery.parseJSON(res.data);
                console.log(res);
                var data = res.data;
                if(res.type == 'new_user_join'){

                    //有新用户加入群聊
                    layim.getMessage({
                        system: true,
                        id: 10000,
                        type: "group",
                        content: data.new_uname + '加入群聊'
                    });

                }else if(res.type == 'server_msg'){
                    //接收好友消息  目前只支持群聊消息
                    //打开会话窗口
                    tmp_group = $.extend(tmp_group,{
                        content:data.msg,
                        username:data.from_uname ? data.from_uname : 'aaaa',
                        avatar: "/wp-content/themes/layui/images/avatar/avatar_1.jpg",
                        type:'group',
                        timestamp:data.time
                    });
                    layim.getMessage(tmp_group);

                }else if(res.type == 'pong'){
                    //心跳监测

                }
            }catch(e){
                //console.log(e);
            }};
        setInterval(function(){
            mySocket.send('ping');
        },6000);
    }
});
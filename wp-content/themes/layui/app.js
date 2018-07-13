layui.use('layim', function(){

    var layim = layui.layim;

    var tmp_group = {
        name: '临时群组',
        groupname: '临时群组',
        'type':'group',
        avatar: 'wp-content/themes/layui/images/avatar/group_default.png',
        id: 10000
    };

    var user_info = mySocket.get_user_info();

    var mine = {
        "username": user_info.uname, //我的昵称
        "id": user_info.uuid, //我的ID
        "status": "online", //在线状态 online：在线、hide：隐身
        "sign": user_info.sign, //我的签名
        "avatar": user_info.avatar, //我的头像
    };


    //基础配置
    layim.config({
        init: {
            mine: mine,
            group:[tmp_group]
        },
        members: {
            url: '/memberList.json'
            ,data: {}
        },
        brief: true //是否简约模式（若开启则不显示主面板）
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
                    //系统消息
                    var sys_msg = {
                        system:true,
                        id:tmp_group.id,
                        type:"group",
                        content: data.new_uname ? data.new_uname : mySocket.create_uname() + '加入群聊'
                    };

                    //有新用户加入群聊
                    layim.getMessage(sys_msg);

                }else if(res.type == 'server_msg'){
                    //接收好友消息  目前只支持群聊消息
                    var is_mine = false;
                    if(data.from_uuid == mine.id){
                        is_mine = true;
                    }
                    //打开会话窗口
                    var msg_object = {
                        groupname:tmp_group.groupname,
                        name:tmp_group.groupname,
                        username:data.from_uname,
                        avatar: data.from_avatar, //消息来源用户头像,
                        id: tmp_group.id, //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
                        type: "group", //聊天窗口来源类型，从发送消息传递的to里面获取
                        content: data.msg, //消息内容
                        cid: 0, //消息id，可不传。除非你要对消息进行一些操作（如撤回）
                        mine: is_mine, //是否我发送的消息，如果为true，则会显示在右方
                        fromid: data.from_uuid, //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
                        timestamp: data.time * 1000, //服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
                    };
                    layim.getMessage(msg_object);

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
<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

//加载函数库及setting config配置文件
require( dirname(__FILE__) . '/wp-load.php' );

$avatar = get_all_avatars();

get_header(); ?>
    <script src="wp-includes/js/jquery-1.10.2.min.js"></script>
    <script src="wp-content/themes/layui/socket.js"></script>
    <link rel="stylesheet" href="wp-content/themes/layui/css/layui.css"  media="all">
    <script src="wp-content/themes/layui/layui.js"></script>
    <script src="wp-content/themes/layui/app.js"></script>


    <div class="wrap">
        <div id="primary" class="content-area">
            <main id="main" class="site-main" role="main">

                <p>点击按钮，试一试</p>
                <br>

                <p><button class="layui-btn site-demo-layim" data-type="chat">加入群聊</button></p>
                <br>

                <p><a class="layui-text" id="edit_user_info" href="javascript:;" onclick="$('#setUserInfo').toggle();">修改个人信息</a></p>

                <div id="setUserInfo" style="display: none;margin-top: 20px;">
                    <form class="layui-form" action="">

                        <div class="layadmin-homepage-pad-ver">
                            <img class="layadmin-homepage-pad-img" id="my_avatar" src="wp-content/themes/layui/images/avatar/avatar_2.jpg" width="96" height="96">
                            <input type="hidden" id="my_avatar_value" name="my_avatar_value" value="" />
                        </div>

                        <div class="layui-form-item" style="margin-top: 20px;">
                                <input type="text" name="title" required id="my_uname"  lay-verify="required" placeholder="请输入用户名（昵称）" autocomplete="off" class="layui-input">
                        </div>
                        <h5>选择你的头像：</h5>
                        <br>
                        <div class="layui-row layui-col-space15" id="avatar-box" style="max-height: 300px;overflow-y: scroll;">

                            <?php foreach($avatar as $key => $val){ ?>
                                <div class="layui-col-md2 layui-col-sm3">
                                    <div class="layadmin-contact-box">
                                        <a href="javascript:;">
                                            <div class="layadmin-text-center">
                                                <img src="<?php echo $val; ?>" style="width: 100%">
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            <?php } ?>

                        </div>

                        <div class="layui-form-item" style="margin-top: 10px;">
                                <button type="button" class="layui-btn" id="sbmt_form">确认修改</button>
                        </div>
                    </form>
                </div>

                <script>

                    $(function(){
                        var userinfo = mySocket.get_user_info();
                        //默认填写当前昵称和头像
                        $("#my_uname").val(userinfo.uname);
                        $("#my_avatar").attr('src',userinfo.avatar);
                        $("#my_avatar_val").val(userinfo.avatar);
                        //监听选中头像事件
                        $("#avatar-box img").click(function(){
                            var src = $(this).attr("src");
                            $("#my_avatar").attr('src',src);
                        })

                        //确认修改
                        $("#sbmt_form").click(function(){
                            if($("#my_uname").val()){
                                reset_user('uname',$("#my_uname").val());
                            }

                            if($("#my_avatar").attr('src')){
                                reset_user('avatar',$("#my_avatar").attr('src'));
                            }

                            MySocket.send('edit_userinfo',{});

                            $("#edit_user_info").trigger('click');
                        })

                    })

                    function reset_user(key,value){
                        var userinfo = mySocket.get_user_info();
                        //修改mysocket属性值
                        mySocket[key] = value;
                        //修改localstorage存储值
                        userinfo[key] = value;
                        mySocket.setStorage('user_info',JSON.stringify(userinfo));
                        //修改layim中mine值
                        if(key == 'uname'){
                            mine['username'] = value;
                        }else if(key == 'avatar'){
                            mine['avatar'] = value;
                        }
                    }
                </script>

            </main><!-- #main -->
        </div><!-- #primary -->
    </div><!-- .wrap -->
<?php get_footer();
<?php
/*
 * 将python爬虫爬的内容写入posts表中
 * */

//加载函数库及setting config配置文件
require( dirname(__FILE__) . '/wp-load.php' );

//加载数据库操作文件
require_wp_db();

global $wpdb;

$info = $wpdb->get_results("select answer.excerpt,answer.content,question.name,question.keywords,answer.answer_id,answer.ans_url from zhihu_answer as answer left join zhihu_question as question on answer.question_id=question.question_id where answer.is_post = 0 limit 10",ARRAY_A);
print_r($info);
$post_time = time();

foreach($info as $key => $val){

    $answer_id = $val['answer_id'];

    $is_post = $wpdb->get_row('select count(*) as num from ' . $wpdb->prefix . 'posts where answer_id=' . $val['answer_id'],ARRAY_A);

    //该回答没有被发表过
    if($is_post['num'] == 0){

        $post_time += 60;       //采集文章发表时间间隔一分钟

        $datares = [
            'post_author' => 2,     //采集文章同一由 others 用户发布
            'post_date' => date("Y-m-d H:i:s",$post_time),    //发表时间必须不一样，不然无法关联上一篇下一篇
            'post_date_gmt' => date("Y-m-d H:i:s",$post_time),
            'post_content' => $val['content'],
            'post_title' => $val['name'],
            'post_excerpt' => $val['excerpt'],
            'post_status' => 'pending',         //等待复审
            'comment_status' => 'closed',
            'ping_status' => 'closed',
            'post_password' => '',
            'post_name' => '',
            'to_ping' => '',
            'pinged' => '',
            'post_modified' => date("Y-m-d H:i:s",$post_time),
            'post_modified_gmt' => date("Y-m-d H:i:s",$post_time),
            'post_content_filtered' => '',
            'post_parent' => '',
            'guid' => '',
            'menu_order' => '',
            'post_type' => 'post',
            'post_mime_type' => '',
            'comment_count' => 0,
            'answer_id' => $val['answer_id'],
            'link_url' => $val['ans_url'] ? $val['ans_url'] : ''
        ];

        $wpdb->insert($wpdb->prefix . 'posts',$datares);

        if($wpdb->insert_id){
            //修改链接地址
            $wpdb->update($wpdb->prefix . 'posts',['guid' => home_url() . '/?p=' . $wpdb->insert_id],['id' => $wpdb->insert_id]);

            //关联文章分类
            $data = [
                'object_id' => $wpdb->insert_id,
                'term_taxonomy_id' => 1,    //网文摘抄
                'term_order' => 0
            ];
            $wpdb->insert($wpdb->prefix . 'term_relationships',$data);

        }

    }

    //修改答案状态
    $wpdb->update('zhihu_answer',['is_post' => 1],['answer_id' => $val['answer_id']]);

}

echo 'SUCCESS!';




?>
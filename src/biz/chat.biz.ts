/*
* 聊天用的 只需要去掉开头的/*和结尾的注释就是业务代码 但是不知道怎么加进去..


socketio.listen(server).on('connection', function (socket) {
    console.log('a user connected');


    //发送私密消息
    socket.on('private message', function (from, to, msg) {

        console.log('I received a private message by ', from, ' say to ', to, 'and the msg is ', msg);
        //判断是否在用户表中
        if (to in users) {
            //如果 to 处于离线状态
            if (users[to] == null) {
                userAndMessage[to].push({
                    mess: msg,
                    fromuser: from,
                });
            }
            else {
                //没离线 直接发送
                users[to].emit('receive', {
                    mess: msg,
                    fromuser: from,
                    touser: to
                });
            }
            console.log(users[to].id);
        }
    });

    //新增用户 data为用户名
    socket.on('new user', function (data) {
        socket.username = data;//给socket绑定用户名
        //先检查message_list
        if (userAndMessage[data] != null) {
            //这个function会触发receive来拉message_list
            socket.emit('some function');
        }


        if (data in users) {
            //替换socket 可能原来存在一个用户 但是用户离线了 现在重新连接 socket更改了
            users[data] = socket;
        } else {
            //新增一个用户名：socket键值对
            var nickname = data;
            users[nickname] = socket;
        }
        console.log(nickname, socket.id);
    });

    //断开连接
    socket.on('disconnect', function () {
        console.log('user disconnected');
        users[socket.username] = null;
        //socket.emit('user disconnected');
    });
});
*/
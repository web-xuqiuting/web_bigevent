$(function() {
    // 点击“去注册账号”的链接
    $("#link_reg").on('click', function() {
        $(".login-box").hide()
        $(".reg-box").show()
    })

    // 点击“去登录”的链接
    $("#link_login").on('click', function() {
        $(".reg-box").hide()
        $(".login-box").show()
    })

    // 从layui 中获取 form对象
    var form = layui.form
    var layer = layui.layer

    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd校验规则
        'pwd': [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        // 校验两次密码是否一致的规则
        repwd: function(value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败,则return一个提示消息即可
            // alert('外面')
            var pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                alert(124)
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $("#form_reg").on('submit', function(e) {

        // 阻止默认的提交行为
        e.preventDefault()

        // 发起Ajax的POST请求
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=username]').val() }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功！,请登录');
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $("#form_login").submit(function(e) {
        // 阻止默认的提交行为
        e.preventDefault()
            // 发起
        $.ajax({
            url: '/api/login',
            method: 'POST',

            // 快速获取表单的数据
            // data: $("#form_login").serialize(),
            data: { username: $('#form_login [name=username]').val(), password: $('#form_login [name=username]').val() },
            success: function(res) {

                if (res.status !== 0) {
                    // alert(12)
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')

                // 将登录成功得到的  token 字符串  保存到localstorage 中
                localStorage.setItem('token', res.token)
                    // console.log(res.token);
                    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcxMCwidXNlcm5hbWUiOiJsY2MiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY0MTkxOTM5MCwiZXhwIjoxNjQxOTU1MzkwfQ.LGGBZVoAAD8XMxICAvI-t6t75_LxELpAJ1hXBFrab3o

                // 跳转到后台主页
                location.href = 'index.html'
            }
        })
    })
})
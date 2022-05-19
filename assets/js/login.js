$(function(){
    $('#link_reg').click(()=>{
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').click(()=>{
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 获取form
    const form = layui.form

    form.verify({
        // 定义校验密码的规则
        pwd:[/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 定义再次确认密码规则
        repwd:(val)=>{
            const pwd = $('.reg-box [name=password]').val()
            if(val !== pwd ) return '两次密码不一致'
        }
    })

    const baseUrl = "http://www.liulongbin.top:3007";

    const layer = layui.layer
    // 监听注册表单提交  ，并发送注册请求
    $('#form_reg').on('submit',function(e){
        // 先阻止表单默认提交
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: baseUrl + "/api/reguser",
            data: {
                username: $("#form_reg [name=username").val(),
                password: $("#form_reg [name=password").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg("注册成功！");
                // 注册成功后跳转到登录界面
                $("#link_login").click();
            }
        })
    })


    // 监听登录表单提交  ，发送登录请求
    $('#form_login').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: baseUrl + "/api/login",
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg("登录成功！");
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem("token", res.token);
                // 跳转到主页
                location.href = "/index.html";
            },
        })
    })
});


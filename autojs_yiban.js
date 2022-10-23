// 判断安卓版本
var androidsdk = 0
switch (device.sdkInt) {
    case 32:
        var deviceSdk = "android.widget.TextView"
        androidsdk = 12
        var serverjiang = "SCT82679TSFYq3lyQi0ajHqBaDbtTmZle"
        log("安卓12")
        break;
    case 29:
        var deviceSdk = "android.view.View"
        androidsdk = 10
        var serverjiang = "SCT130565T7AtJe5yUGBlDAZmdwQC8lsew"
        log("安卓10")
        break;
    default:
        result("不支持你的设备")
        break
}

// 返回现在小时（24时制）
function udTime() {
    var curr_time = new Date();
    var now_Hours = curr_time.getHours();
    var now_Minutes = curr_time.getMinutes();
    var now_day = curr_time.getDay();
    return now_Hours;
}

// 表单确认
function confirm() {
    className("android.widget.TextView").text("确定").findOne("5000").click()
    sleep(500)
}

// 微信推送
function weixin(weiXin_Text) {
    var r = http.get("https://sctapi.ftqq.com/" + serverjiang + ".send?title=❌❌❌" + weiXin_Text + "❌❌❌");
    r = null;
}


// 启动
// 启动
// 启动
function start_Up() {
    log("开始自动签到-打开易班");
    launchApp("易班");
    sleep(1000)
    // 开屏跳过
    log("检测跳过")
    if (id("btn_splash_ad").findOne(10000)) {
        id("btn_splash_ad").click()
        log("跳过")
    }

    // 判断3秒公告
    sleep(1000)
    log("判断是否有公告");
    if (id("iv_close").findOne(3000)) {
        id("iv_close").click()
        sleep(500)
        id("iv_close").click()
        sleep(500)
        id("iv_close").click()
        log("已关闭全部公告");
    }
}
// 找打卡
// 找打卡
// 找打卡
function find_Punsh(order_Number) {
    switch (order_Number) {
        case 1:
            log("找到到校本化并点击");
            sleep(1000)
            className("android.widget.TextView").text("校本化").findOne(10000).parent().click()
            break;
        case 2:
            log("找到任务反馈并点击")
            sleep(1000)
            className(deviceSdk).text("任务反馈").click()
            break;
        case 3:
            log("找到健康打卡并点击")
            sleep(1000);
            className("android.widget.TextView").text("未反馈").findOne(60000).parent().click()
            break;
        case 4:
            log("找到反馈并点击");
            sleep(1000)
            className("android.widget.Button").text("反 馈").click();
            break;
    }
}
// 表单
// 表单
// 表单
function punch_Form() {
    log("是否上次填写")
    if (className(deviceSdk).text("是否填入上一次已填写内容？").findOne(10000)) {
        log("是")
        className("android.widget.Button").text("确定").findOne(3000).click()

        log("定位")
        switch (androidsdk) {
            case 12:
                click(999, 1644, 1042, 1688)
                break;
            case 10:
                className("android.widget.Image").depth(7).text("图标").findOne(3000).click()
                sleep(3000)
                if (className("android.widget.Image").depth(7).text("图标").findOne(3000)) {
                    className("android.widget.Image").depth(7).text("图标").findOne(3000).click()
                }
                break;
        }
        sleep(1000)

        swipe(540, 1700, 540, 500, 500);
        sleep(1000)
        log("开始签名")
        switch (androidsdk) {
            case 12:
                swipe(460, 1300, 465, 1305, 500)
                break;
            case 10:
                swipe(580, 1600, 585, 1605, 500)
                break;
        }
        sleep(1000)


        log("提交");
        className("android.widget.Button").text("提 交").click();
        if (className("android.widget.Button").text("转发审批表单").findOne(20000)) {
            var r = http.get("https://sctapi.ftqq.com/" + serverjiang + ".send?title=✅✅✅易班打卡成功✅✅✅");
        } else {
            var r = http.get("https://sctapi.ftqq.com/" + serverjiang + ".send?title=❌❌❌打卡失败❌❌❌");
        }
    } else {
        weixin("未找到上次填写");
    }

}



console.show()
sleep(1000)

start_Up()
className("android.widget.TextView").text("校本化").findOne(60000) ? find_Punsh(1) : weixin("找不到校本化");
className(deviceSdk).text("任务反馈").findOne(60000) ? find_Punsh(2) : weixin("找不到任务反馈");
className("android.widget.TextView").text("未反馈").findOne(60000) ? find_Punsh(3) : weixin("找不到未反馈")
className("android.widget.Button").text("反 馈").findOne(60000) ? find_Punsh(4) : weixin("找不到反馈按钮")
punch_Form()

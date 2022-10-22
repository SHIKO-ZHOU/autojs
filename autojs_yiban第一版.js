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




//2.判断时间段 我的设置是周一到周五打卡，在8点38分后进行上班打卡,未启用

function udTime() {
    var curr_time = new Date();
    var now_Hours = curr_time.getHours();
    var now_Minutes = curr_time.getMinutes();
    var now_day = curr_time.getDay();
    return now_Hours;
}



function confirm() {
    className("android.widget.TextView").text("确定").findOne("5000").click()
    sleep(500)
}





function result(text) {
    while (true) {
        var i = dialogs.select(text);
        i = 99;
        if (i == 99) {
            break;
        } else {
            i = 99;
            break;
        }
    }
}


console.show()

sleep(1000)
log("开始自动签到-打开易班");
launchApp("易班");
sleep(1000)

log("检测跳过")
if (id("btn_splash_ad").findOne(10000)) {
    id("btn_splash_ad").click()
    log("跳过")
}

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
//检测校本化
if (className("android.widget.TextView").text("校本化").findOne(60000)) {
    log("找到到校本化并点击");
    sleep(100)
    className("android.widget.TextView").text("校本化").findOne(10000).parent().click()
    //进入任务反馈
    if (className(deviceSdk).text("任务反馈").findOne(60000)) {
        log("找到任务反馈并点击")
        sleep(1000)
        className(deviceSdk).text("任务反馈").click()
        //进入健康打卡
        if (className("android.widget.TextView").text("未反馈").findOne(60000)) {
            log("找到健康打卡并点击")
            sleep(1000);
            className("android.widget.TextView").text("未反馈").findOne(60000).parent().click()
            // 进入健康打卡表格
            if (className("android.widget.Button").text("反 馈").findOne(60000)) {
                log("找到反馈并点击");
                sleep(1000)
                className("android.widget.Button").text("反 馈").click();
                // 开始选择
                // if (className("android.widget.TextView").text("体温").findOne()) {
                sleep(1000)

                //表单内容
                //表单内容
                //表单内容
                //表单内容

                // 判断是否上次填写
                log("是否上次填写")
                if (className(deviceSdk).text("是否填入上一次已填写内容？").findOne(5000)) {
                    log("是")
                    className("android.widget.Button").text("确定").findOne(3000).click()
                } else {
                    log("点击体温");
                    className("android.widget.TextView").text("体温").findOne(10000).parent().parent().click()
                    sleep(500)
                    log("确认")
                    confirm();



                    log("点击情况");
                    className("android.widget.TextView").text("是否有下列情况（多选）").findOne(3000).parent().click()
                    sleep(500)
                    log("选择没有");
                    className("android.widget.CheckBox").text("没有出现症状").click()
                    sleep(500)
                    confirm();


                    log("点击健康码");
                    className("android.widget.TextView").text("粤康码颜色").findOne(3000).parent().click()
                    sleep(500)
                    log("绿码");
                    confirm();

                    log("点击心里健康");
                    className("android.widget.TextView").text("今日心理健康情况？").findOne(3000).parent().click()
                    sleep(500)
                    log("健康");
                    confirm();



                    log("点击14天");
                    className("android.widget.TextView").text("14天内曾居住或前往疫情高发地").findOne(3000).parent().click()
                    sleep(500)
                    log("选择否");
                    swipe(530, 1600, 530, 1400, 200);
                    sleep(500)
                    confirm();

                    log("点击两周");
                    className("android.widget.TextView").text("两周内有与确诊患者接触").findOne(3000).parent().click()
                    sleep(500)
                    log("选择否");
                    swipe(530, 1600, 530, 1400, 200);
                    sleep(500)
                    confirm();

                    log("点击省外居住史");
                    className("android.widget.TextView").text("近14天是否有广东省外旅居史").findOne(3000).parent().click()
                    sleep(500)
                    log("选择否");
                    swipe(530, 1600, 530, 1400, 200);
                    sleep(500)
                    confirm();;

                    log("点击境外居住史");
                    className("android.widget.TextView").text("目前是否在境外或近14天有境外旅居史").findOne(3000).parent().click()
                    sleep(500)
                    log("选择否");
                    swipe(530, 1600, 530, 1400, 200);
                    sleep(500)
                    confirm();

                    log("点击低中高风险");
                    className("android.widget.TextView").text("目前是否在低、中、高风险地区所在城市").findOne(3000).parent().click()
                    sleep(500)
                    log("选择否");
                    swipe(530, 1600, 530, 1400, 200);
                    sleep(500)
                    confirm();;
                }


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
                //表单内容
                //表单内容
                //表单内容

                className("android.widget.Button").text("提 交").click();
                if (className("android.widget.Button").text("转发审批表单").findOne(20000)) {

                    var r = http.get("https://sctapi.ftqq.com/" + +".send?title=✅✅✅易班打卡成功✅✅✅");
                    result("✅✅✅易班打卡成功✅✅✅")
                } else {
                    var r = http.get("https://sctapi.ftqq.com/SCT82679TSFYq3lyQi0ajHqBaDbtTmZle.send?title=易班打卡失败");
                    // log("code = " + r.statusCode);
                    // log("html = " + r.body.string());
                    result("❌❌❌打卡失败❌❌❌")
                    var r = http.get("https://sctapi.ftqq.com/" + serverjiang + ".send?title=❌❌❌打卡失败❌❌❌");
                }
            } else {
                result("❌❌❌找不到反馈❌❌❌")
                var r = http.get("https://sctapi.ftqq.com/" + serverjiang + ".send?title=❌❌❌找不到反馈❌❌❌");
            }
        } else {
            result("❌❌❌找不到健康打卡❌❌❌")
            var r = http.get("https://sctapi.ftqq.com/" + serverjiang + ".send?title=❌❌❌找不到健康打卡❌❌❌");
        }
    } else {
        result("❌❌❌找不到任务反馈❌❌❌")
        var r = http.get("https://sctapi.ftqq.com/" + serverjiang + ".send?title=❌❌❌找不到任务反馈❌❌❌");
    }
} else {
    result("❌❌❌找不到校本化❌❌❌")
    var r = http.get("https://sctapi.ftqq.com/" + serverjiang + ".send?title=❌❌❌找不到校本化❌❌❌");
}
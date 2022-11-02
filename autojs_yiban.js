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


//关闭指定包名的应用
function killApp(packageName) {
    shell('am force-stop ' + packageName, true);
};




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

function start_Up() {
    console.show()
    log("销毁易班")
    killApp("com.yiban.app")
    sleep(1000)
    log("开始自动签到-打开易班");
    launchApp("易班");
    log("11月2日更新,修复定位检测")
    log("11月2日更新,优化签名")
    log("11月2日更新,移除下滑")
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

// 进入表单
function into_Form() {
    if (className("android.widget.TextView").text("校本化").findOne(60000)) {
        log("找校本化并点击");
        sleep(3000)
        className("android.widget.TextView").text("校本化").findOne(1000).parent().click()

        log("找任务反馈并点击")
        className(deviceSdk).text("任务反馈").findOne(60000).click()

        log("找健康打卡并点击")
        className("android.widget.TextView").text("未反馈").findOne(60000).parent().click()

        log("找反馈并点击");
        className("android.widget.Button").text("反 馈").findOne(60000).click();
    } else {
        weixin("未找到入口")
    }
}

// 常规表单
function routine_Form(form_ClassName, form_Text, form_Time, form_Return, form_Type) {
    if (className(form_ClassName).text(form_Text).findOne(form_Time)) {
        className(form_ClassName).text(form_Text).findOne(form_Time).parent().parent().click()

        // 类型
        switch (form_Type) {
            case 0: //滑动组
                sleep(500)
                log(form_Return);
                swipe(530, 1600, 530, 1400, 200);
                sleep(500)
                confirm();
                break;
            case 1: //单选组
                sleep(500)
                log(form_Return)
                confirm();
                sleep(500)
                break;
        }
    }
}


// =============================开始=================================
// =============================开始=================================
// =============================开始=================================

start_Up()
into_Form()
sleep(1000)

log("是否上次填写")
if (className(deviceSdk).text("是否填入上一次已填写内容？").findOne(10000)) {
    log("是")
    className("android.widget.Button").text("确定").findOne(3000).click()
} else {
    // 单选组
    log("===找体温===");
    routine_Form("android.widget.TextView", "体温", 3000, "正常体温", 1)

    log("===找情况==="); //就你特殊
    if (className("android.widget.TextView").text("是否有下列情况（多选）").findOne(1000)) {
        className("android.widget.TextView").text("是否有下列情况（多选）").findOne(1000).parent().click()
        sleep(500)
        log("选择没有");
        className("android.widget.CheckBox").text("没有出现症状").click()
        sleep(500)
        confirm();
    }

    log("===找健康码==");
    routine_Form("android.widget.TextView", "粤康码颜色", 1000, "绿码", 1)
    log("===找心里健康===");
    routine_Form("android.widget.TextView", "今日心理健康情况？", 1000, "健康", 1)
    log("===找密接===")
    routine_Form("android.widget.TextView", "是否密接/次密接？", 1000, "密接", 0)
    log("===找核酸结果===")
    routine_Form("android.widget.TextView", "核酸结果", 1000, "阴性", 1)
    // 滑动组
    log("===找14天===");
    routine_Form("android.widget.TextView", "14天内曾居住或前往疫情高发地", 1000, "选择否", 0);
    log("===找两周===");
    routine_Form("android.widget.TextView", "两周内有与确诊患者接触", 1000, "选择否", 0)
    log("===找省外居住史===");
    routine_Form("android.widget.TextView", "近14天是否有广东省外旅居史", 1000, "选择否", 0)
    log("===找境外居住史===");
    routine_Form("android.widget.TextView", "目前是否在境外或近14天有境外旅居史", 1000, "选择否", 0)
    log("===找低中高风险===");
    routine_Form("android.widget.TextView", "目前是否在低、中、高风险地区所在城市", 1000, "选择否", 0)
}

log("定位")
switch (androidsdk) {
    case 12:
        // 判断是否定位
        do {
            className("android.widget.Image").depth(7).text("图标").findOne(3000).parent().click()
            sleep(3000)
        } while (className("android.widget.Image").depth(7).text("图标").exists())
        break;
    case 10:
        do {
            className("android.widget.Image").depth(7).text("图标").findOne(3000).click()
            sleep(3000)
        } while (className("android.widget.Image").depth(7).text("图标").exists());
        break;
}
sleep(1000)

// 滑动
// swipe(device.width / 1.2, device.height / 2.3, device.width / 1.2, 0, 300);


sleep(1000)
log("开始签名")
className("android.widget.Image").clickable(true).depth(6).indexInParent(0).findOne(5000).click()
sleep(1000)


log("提交");
className("android.widget.Button").text("提 交").click();
if (className("android.widget.Button").text("转发审批表单").findOne(20000)) {
    var r = http.get("https://sctapi.ftqq.com/" + serverjiang + ".send?title=✅✅✅易班打卡成功✅✅✅");
} else {
    weixin("未找到打卡结果");
}
killApp("com.example.script1666410869226")
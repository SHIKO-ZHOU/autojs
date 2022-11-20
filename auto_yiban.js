// 判断安卓版本
var androidsdk = 0
switch (device.sdkInt) {
    case 32:
        var device_model = device.model
        var deviceSdk = "android.widget.TextView"
        androidsdk = 12
        var serverjiang = "SCT82679TSFYq3lyQi0ajHqBaDbtTmZle"
        log("安卓12-" + device_model)
        break;
    case 29:
        result("由于手上没有安卓10的设备，导致适配安卓10困难")
        var device_model = device.model
        var deviceSdk = "android.view.View"
        androidsdk = 10
        var serverjiang = "SCT82679TSFYq3lyQi0ajHqBaDbtTmZle"
        log("安卓10-" + device_model)
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
                sleep(1000)
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

// 定位
function daka_location() {
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
                className("android.widget.Image").depth(10).text("图标").findOne(3000).click()
                sleep(3000)
            } while (className("android.widget.Image").depth(10).text("图标").exists());
            break;
    }
}

function auto_Submit() {
    log("提交");
    className("android.widget.Button").text("提 交").click();
    if (className("android.widget.Button").text("转发审批表单").findOne(20000)) {
        var r = http.get("https://sctapi.ftqq.com/" + serverjiang + ".send?title=✅✅✅" + device_model + "打卡成功✅✅✅");
    } else {
        weixin(device_model + "未找到打卡结果");
    }
}

function start_Up() {
    console.show()
    log("销毁易班")
    killApp("com.yiban.app")
    sleep(1000)
    log("开始自动签到-打开易班");
    launchApp("易班");
    log("11月19日更新,手头没有安卓10设备")
    log("11月19日更新,停止对安卓10适配")
    log("11月19日更新,停止对安卓10适配")
    sleep(1000)
    // 开屏跳过
    log("检测跳过")
    if (id("btn_splash_ad").findOne(3500)) {
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
    into_Form()
}

// 进入表单
function into_Form() {
    if (className("android.widget.TextView").text("校本化").findOne(30000)) {
        log("找校本化并点击");
        className("android.widget.TextView").text("校本化").findOne(1000).parent().click()

        log("找任务反馈并点击")
        className(deviceSdk).text("任务反馈").findOne(30000).click()

        log("找健康打卡并点击")

        if (className("android.widget.TextView").text("未反馈").findOne(30000)) {
            className("android.widget.TextView").text("未反馈").findOne(30000).parent().click()
        } else {
            weixin(device_model + "未找打卡表单");
            sleep(5000)
            killApp("com.example.script1666410869226");
        }

        log("找反馈并点击");
        className("android.widget.Button").text("反 馈").findOne(30000).click();
    } else {
        weixin(device_model + "未找到入口")
        sleep(5000)
        killApp("com.example.script1666410869226")
    }
    auto_Form()
}

function auto_Form() {
    if (className("android.widget.Button").text("提 交").findOne(15000)) {
        log("已进入表单~检测上次填写")
        if (className(deviceSdk).text("是否填入上一次已填写内容？").findOne(5000)) {
            log("是")
            className("android.widget.Button").text("确定").findOne(3000).click()
        }
        // 单选组
        log("===找体温===");
        routine_Form("android.widget.TextView", "体温（晨检）", 300, "正常体温", 1)
        routine_Form("android.widget.TextView", "体温（午检）", 300, "正常体温", 1)
        routine_Form("android.widget.TextView", "体温（晨检）", 300, "正常体温", 1)
        routine_Form("android.widget.TextView", "体温", 300, "正常体温", 1)

        log("===找情况==="); //就你特殊
        if (className("android.widget.TextView").text("是否有下列情况（多选）").findOne(300)) {
            className("android.widget.TextView").text("是否有下列情况（多选）").findOne(300).parent().click()
            sleep(300)
            log("选择没有");
            className("android.widget.CheckBox").text("没有出现症状").click()
            sleep(300)
            confirm();
        }
        log("===找健康码==");
        routine_Form("android.widget.TextView", "粤康码颜色", 300, "绿码", 1)
        log("===找心里健康===");
        routine_Form("android.widget.TextView", "今日心理健康情况？", 300, "健康", 1)
        log("===找核酸结果===")
        routine_Form("android.widget.TextView", "核酸结果", 300, "阴性", 1)
        // 滑动组
        log("===7天内前往疫情发生地===");
        routine_Form("android.widget.TextView", "7天内曾居住或前往疫情发生地", 300, "否", 0)
        log("===7天内与患者接触===")
        routine_Form("android.widget.TextView", "7天内有与确诊患者接触", 300, "否", 0)
        log("===7天省外旅居史===")
        routine_Form("android.widget.TextView", "近7天是否有广东省外旅居史", 300, "否", 0)
        log("===7天境外旅居史===")
        routine_Form("android.widget.TextView", "目前是否在境外或近7天有境外旅居史", 300, "否", 0)
        log("===找密接===")
        routine_Form("android.widget.TextView", "是否密接/次密接？", 300, "不密接", 0)
        log("===找14天===");
        routine_Form("android.widget.TextView", "14天内曾居住或前往疫情高发地", 300, "选择否", 0);
        log("===找两周===");
        routine_Form("android.widget.TextView", "两周内有与确诊患者接触", 300, "选择否", 0)
        log("===找省外居住史===");
        routine_Form("android.widget.TextView", "近14天是否有广东省外旅居史", 300, "选择否", 0)
        log("===找境外居住史===");
        routine_Form("android.widget.TextView", "目前是否在境外或近14天有境外旅居史", 300, "选择否", 0)
        log("===找低中高风险===");
        routine_Form("android.widget.TextView", "目前是否在低、中、高风险地区所在城市", 300, "选择否", 0)
        // 打卡定位
        daka_location()

        sleep(1000)
        log("开始签名")
        switch (androidsdk) {
            case 12:
                className("android.widget.Image").clickable(true).depth(6).indexInParent(0).findOne(5000).click()
                sleep(1000)
                break;
            case 10:
                className("android.widget.Image").clickable(true).depth(9).indexInParent(0).findOne(5000).click()
                sleep(1000)
                break;
        }
        auto_Submit()
    } else {
        weixin(device_model + "未进入表单");
        sleep(5000)
        killApp("com.example.script1666410869226")
    }
}




// =============================开始=================================
// =============================开始=================================
// =============================开始=================================

start_Up()
sleep(1000)
killApp("com.example.script1666410869226")

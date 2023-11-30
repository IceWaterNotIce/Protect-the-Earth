// check user device type
// return: device type
// 1: mobile
// 2: tablet
// 3: desktop
// 4: unknown
function checkDeviceType() {
    var deviceType = 4;
    var deviceWidth = window.innerWidth;
    var deviceHeight = window.innerHeight;
    var deviceRatio = deviceWidth / deviceHeight;
    if (deviceWidth <= 768) {
        deviceType = 1;
    } else if (deviceWidth > 768 && deviceWidth <= 1024) {
        deviceType = 2;
    } else if (deviceWidth > 1024) {
        deviceType = 3;
    }
    return deviceType;
}
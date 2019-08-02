// import Common from "./common"

/**
 * 数据是否为空
 * @param {String} str 判断数据
 */
function isNull(str) {
  if (!str || str === "" || str === null || str === undefined) return true;
  return false;
}

/**
	 * 判断身份证号码
	 * num：身份证号码
	 * isNew:是不是新的标准 true，默认为false
	 */
function isIDCardNum(num, isNew) {
  if (isNew) {
    if (num.length != 18) {
      return '输入的身份证号长度不对，或者号码不符合规定！<br>18位号码末位可以为数字或X。';
    }
  }
  num = num.toUpperCase();
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
    return '输入的身份证号长度不对，或者号码不符合规定！<br>15位号码应全为数字，18位号码末位可以为数字或X。';
  }
  //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  //下面分别分析出生日期和校验位
  let len = num.length, re;
  if (len == 15) {
    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
    let arrSplit = num.match(re);

    //检查生日日期是否正确
    let dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
    let bGoodDay;
    bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      return '输入的身份证号里出生日期不对！';
    } else {
      //将15位身份证转成18位
      //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      let nTemp = 0,
        i;
      num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      num += arrCh[nTemp % 11];
      return true;
    }
  }
  if (len == 18) {
    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
    let arrSplit = num.match(re);

    //检查生日日期是否正确
    let dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
    let bGoodDay;
    bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      return '输入的身份证号里出生日期不对！';
    } else {
      //检验18位身份证的校验码是否正确。
      //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      let valnum;
      let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      let nTemp = 0,
        i;
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      valnum = arrCh[nTemp % 11];
      if (valnum != num.substr(17, 1)) {
        //$("#tip").html('18位身份证的校验码不正确！应该为：' + valnum);
        return '18位身份证的校验码不正确！';
      }
      return true;
    }
  }
  return '18位身份证的校验码不正确！';
}
/**
 * 检查手机号是否合法
 * @param {String} phone 手机号
 */
function isPhoneNumber(phone) {
  let phoneID = /^((13|14|15|16|17|18|19)){1}\d{9}$/;
  if (!phoneID.test(phone)) return false;
  return true;
}
/**
 * 判断是否为汉字
 * @param {String} str 
 */
function checkChar(str) {
  var reg = /^[\u4e00-\u9fa5]+$/;
  if (!reg.test(str)) return false;
  return true;
}

export function reportData(data) {
  // 实时上报
  console.log('异步上报用户填写数据', data);
}

export function checkPhone(v) {
  if (isNull(v)) return "请输入手机号码";
  if (!isPhoneNumber(v)) return "请输入正确的手机号码";
  return true
}

export function checkName(v) {
  if (isNull(v)) return "请输入办理人姓名";
  if (!checkChar(v)) return "办理人姓名只能是汉字";
  //判断姓名少于两位
  if (v.length < 2) return "姓名必须至少包含2个汉字";
  return true
}

export function checkIDCard(v) {
  //判断身份证号是否为空
  if (isNull(v)) return '请输入身份证号码';
  //判断身份证号格式
  if (isIDCardNum(v, true) != true) return '请输入正确的身份证号码';
  var year = new Date().getFullYear();
  var month = new Date().getMonth() + 1;
  var day = new Date().getDate();
  var birYear = parseInt(v.substr(6, 4));
  var birMonth = parseInt(v.substr(10, 2));
  var birDay = parseInt(v.substr(12, 2));
  var age = year - birYear;

  if (age < 16) return '年龄需大于等于16周岁才可办理';
  if (age === 16) {
    if (month < birMonth) return '年龄需大于等于16周岁才可办理';
    if (month === birMonth && day < birDay) return '年龄需大于等于16周岁才可办理';
  }
  if (age > 51) return '年龄需小于等于50周岁才可办理';

  return true
}

export function checkAddress(v) {
  //判断详细地址是否为空
  if (isNull(v)) return '请输入详细地址';
  //地址信息不得含特殊字符
  let roadReg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/gi;
  if (!roadReg.test(v)) return '地址信息不得含特殊字符哟';
  let roadReg2 = /^[A-Za-z0-9]+$/gi;
  if (roadReg2.test(v)) return '地址信息不得纯为英文字母或数字哟';
  return true
}
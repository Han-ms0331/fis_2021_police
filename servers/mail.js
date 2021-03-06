const nodemailer = require("nodemailer");
const { resetWarningCache } = require("prop-types");
const Imap = require("imap-simple");
const _ = require("lodash");
const { resolveContent } = require("nodemailer/lib/shared");
const express = require("express");

const transporter = nodemailer.createTransport({
  host: "smtp.mailplug.co.kr",
  port: 465,
  secure: true,
  auth: {
    user: "fis182@fisolution.co.kr",
    pass: "fis1234*",
  },
});

var config = {
  imap: {
    user: "fis182@fisolution.co.kr",
    password: "fis1234*",
    host: "imap.mailplug.co.kr",
    port: 993,
    tls: true,
    ssl: true,
  },
};

module.exports = {
  send: async function (receiver) {
    let info = await transporter.sendMail({
      from: "fis182@fisolution.co.kr", // sender address
      to: receiver, // list of receivers
      subject: "지문 등 사전등록신청서 양식 입니다.", // Subject line
      html: `<div name="mp-default" style="font-family:돋움,Dotum;font-size:10pt;"><div class="gmail_attr" style="color: rgb(80, 0, 80); text-transform: none; text-indent: 0px; letter-spacing: normal; font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-weight: 400; word-spacing: 0px; white-space: normal; orphans: 2; widows: 2; background-color: rgb(255, 255, 255); font-variant-ligatures: normal; font-variant-caps: normal; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;" dir="ltr"><b style="font-family: batang, serif; font-size: large; background-color: rgb(244, 204, 204);"><u>&lt;'21년 지문등 사전등록제 현장방문 등록사업&gt;</u></b><br></div><div style="color: rgb(80, 0, 80); text-transform: none; text-indent: 0px; letter-spacing: normal; font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-weight: 400; word-spacing: 0px; white-space: normal; orphans: 2; widows: 2; background-color: rgb(255, 255, 255); font-variant-ligatures: normal; font-variant-caps: normal; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;" dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div dir="ltr"><div class="gmail_quote"><div><div style="font-size: 10pt;" name="mp-default"><div style="font-size: 10pt;" name="mp-default"><div style="font-size: 10pt;" name="mp-default"><div style="font-size: 10pt;" name="mp-default"><div style="font-size: 10pt;" name="mp-default"><div style="font-size: 10pt;" name="mp-default"><div style="font-size: 10pt;" name="mp-default"><div style="font-size: 10pt;" name="mp-default"><div style="font-size: 10pt;" name="mp-default"><div style="font-size: 10pt;" name="mp-default"><div style="font-size: 10pt;" name="mp-default"><div style="font-size: 10pt;" name="mp-default"><font face="batang, serif" style="background-color: rgb(244, 204, 204);"><u></u><u></u></font><div style="font-size: 10pt;" name="mp-default"><font face="batang, serif" style="background-color: rgb(244, 204, 204);"><u></u><u></u></font><div style="font-size: 10pt;" name="mp-default"><font face="batang, serif" style="background-color: rgb(244, 204, 204);"><u></u><u></u><u></u><u></u></font><div style="font-size: 10pt;" name="mp-default"><p style="font-size: 13.33px;"><br style="margin: 0px; padding: 0px;"><b>1. 사업 추진근거</b></p><p style="font-family: 돋움, Dotum; font-size: 13.33px;">&nbsp;- 실종아동등 보호 및 지원에 관한 법률 제7조의2</p><p style="font-family: 돋움, Dotum; font-size: 13.33px;">&nbsp;- 실종아동등의 보호 및 지원에 관한 법률 시행령 제3조의2</p><p style="font-family: 돋움, Dotum; font-size: 13.33px;">&nbsp;- 실종아동등의 발견 및 유전자검사 등에 관한 규칙 제3조</p><p style="font-family: 돋움, Dotum; font-size: 13.33px;"><br style="margin: 0px; padding: 0px;"><b>2. 사업의 필요성</b></p><p style="font-family: 돋움, Dotum; font-size: 13.33px;">&nbsp;- 등록대상자 중 8세미만 아동, 지적장애인, 치매환자 등 인지능력이 낮아 실종 위험도가 높은</p><p style="font-family: 돋움, Dotum; font-size: 13.33px;">&nbsp; &nbsp;등록대상자 선정하여 선택과 집중에 따른 사전등록 필요함</p><p style="font-family: 돋움, Dotum; font-size: 13.33px;"><br style="margin: 0px; padding: 0px;"><b>3. 추진 경과</b></p><p style="font-family: 돋움, Dotum; font-size: 13.33px;">&nbsp;- 경찰청에서 '14년부터 '21년까지 실시하고 있는 7년차 계속 사업</p><p style="font-family: 돋움, Dotum; font-size: 13.33px;"><br style="margin: 0px; padding: 0px;"><b>4. 등록 방법</b><br style="margin: 0px; padding: 0px;"><font color="#38761d"><b><i>&nbsp;가.</i></b></font><span>&nbsp;</span>시설(어린이집, 유치원 등) 협조 사항<br style="margin: 0px; padding: 0px;">&nbsp;- 위탁업체에 신청접수 및 관련 양식 요청(첨부파일 참조)<br style="margin: 0px; padding: 0px;">&nbsp;- 신청서 아동에게 배포<br style="margin: 0px; padding: 0px;">&nbsp;- 신청서 취합 및 기재사항 확인(시설담당자)<br style="margin: 0px; padding: 0px;">&nbsp;- 신청서 취합된 건수 위탁업체 통보</p><p style="font-family: 돋움, Dotum; font-size: 13.33px;"><font color="#6aa84f">&nbsp;<b><i>나</i></b></font><b><i>.</i></b><span>&nbsp;</span>위탁업체(에프아이솔루션) 업무<br style="margin: 0px; padding: 0px;">&nbsp;- 시설별 신청서 기본사항 입력 및 확인<br style="margin: 0px; padding: 0px;">&nbsp;- 지문등록 업체, 시설 방문일정 조율(지역별 순회 방문 예정)<br style="margin: 0px; padding: 0px;">&nbsp;- 아동 지문 및 사진 현장등록<br style="margin: 0px; padding: 0px;">&nbsp;- 최종내용 확인 및 정리<br style="margin: 0px; padding: 0px;">&nbsp;- 취합된 신청서는 경찰청 182센터로 발송<br style="margin: 0px; padding: 0px;">&nbsp;- 사전등록 마무리</p><p style="font-family: 돋움, Dotum; font-size: 13.33px;"><b><br style="margin: 0px; padding: 0px;"></b></p><p style="font-family: 돋움, Dotum; font-size: 13.33px;"><b>5. 특이 사항</b></p><p style="font-family: 돋움, Dotum; font-size: 13.33px;">&nbsp;가. 지문등 사전등록 현장방문 사업은 경찰청 주관으로 조달청 통하여 저희((주)에프아이솔루션) 업체가 선정된 것으로서 믿고 등록하셔도 됩니다.<br style="margin: 0px; padding: 0px;">&nbsp;나. 일반아동의 경우 등록이 가능한 나이는 만8세 미만 아동입니다.<br style="margin: 0px; padding: 0px;">&nbsp;다. 지적장애 및 특수학생 첨부 서류<br style="margin: 0px; padding: 0px;"><font color="#000000"><b style="background-color: rgb(255, 242, 204);">(1) 지적장애</b></font><span>&nbsp;</span>: 복지카드, 장애인증, 특수교육 대상 아동이란 소견서 및 서류, 배치통지서 중 택1<br style="margin: 0px; padding: 0px;"><b style="background-color: rgb(255, 242, 204);">(2) 치매 환자</b><span>&nbsp;</span>: 진단서, 처방전, 기관내에서 인지관련 작성한 소견서 등<br style="margin: 0px; padding: 0px;">&nbsp;라. 결석 시 등록방법 : 지구대나 담당경찰서 내방 시 관계를 확인할 수 있는 서류(등본 및 가족관계증명서) 지참하여 방문해주시기 바랍니다.</p><b></b></div><div style="font-size: 10pt;" name="mp-default"><b><p style="font-family: 돋움, Dotum; font-size: 13.33px;"><br style="margin: 0px; padding: 0px;"></p></b><div style="font-family: 돋움; font-size: 10pt;"><div><font color="#a64d79" face="Courier New" size="4" style="background-color: rgb(217, 210, 233);">&lt;찾아가는 현장 현장방문 지문 등 사전 등록제&gt;</font></div><div><font color="#a64d79" face="Courier New" size="4">등록대상: 8세미만아동&nbsp; , 장애인 (지적,자폐.정신). 치매질환자</font></div><div><font color="#a64d79" face="Courier New" size="4">신청접수기간:2021.6.15~2021.12.08</font></div><div><font color="#a64d79" face="Courier New" size="4">지문등록사업단 연락처: 070-7872-7741~ 7 (에프아이솔루션)&nbsp;</font><br></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div><div><div>
<div>(주)에프아이솔루션  Email : fis182@fisolution.co.kr <div>
<div>서울특별시 금천구 가산디지털2로 108 1204, 1207호 (가산동, 뉴티캐슬) <div>
<div>TEL  : 070-7872-7748   Fax : 02-2626-9800<div> `, // html body
      attachments: [
        {
          filename: "21년 지문등 사전등록 신청서_양식.hwp",
          path: "21년 지문등 사전등록 신청서_양식.hwp",
        },
        {
          filename: "2021_경찰청_팝업_배부용.jpg",
          path: "2021_경찰청_팝업_배부용.jpg",
        },
        {
          filename: "21년 지문등 사전등록 현장방문 사업추진 관련 협조 요청.pdf",
          path: "21년 지문등 사전등록 현장방문 사업추진 관련 협조 요청.pdf",
        },
      ],
    });
    console.log("Message sent: %s", info.messageId);
  },
  wh_sent: async (
    center_email,
    center_id,
    center_address,
    center_name,
    manager_ph,
    userName
  ) => {
    let date = new Date();
    let info = await transporter.sendMail({
      from: "fis182@fisolution.co.kr", // sender address
      to: "fis182@fisolution.co.kr", // list of receivers
      subject: `${date.toLocaleString()}에 ${center_name}에게 보낸 메일 입니다`, // Subject line
      text: `보낸이 : ${userName}\n 센터 id : ${center_id}\n 센터 이름 : ${center_name}\n 센터 주소 : ${center_address}\n 센터 email : ${center_email}\n 센터 전화번호 : ${manager_ph}`,
    });
  },

  a: async () => {
    let result = await Imap.connect(config).then(function (connection) {
      return connection.openBox("INBOX").then(function () {
        var delay = 24 * 3600 * 1000;
        var yesterday = new Date();
        yesterday.setTime(Date.now() - delay);
        yesterday = yesterday.toISOString();
        var searchCriteria = [["SINCE", yesterday]];

        var fetchOptions = {
          bodies: ["HEADER", "TEXT"],
          markSeen: false,
        };
        return connection
          .search(searchCriteria, fetchOptions)
          .then(function (messages) {
            let subjects = [];
            messages.forEach(function (item) {
              let header = _.find(item.parts, { which: "HEADER" });
              let text = _.find(item.parts, { which: "TEXT" });
              let subject = header.body.subject[0];
              let filters = /\<.+\@.+\..+\>/;
              if (subject.includes("failure")) {
                let target = text.body.match(filters);
                subject = `${target}` + "에게 보내지지 않았습니다. ";
                subject +=
                  "메일 주소를 다시 확인해 주세요 " +
                  header.body.date[0] +
                  "에 발송됨";
                subjects.push(subject);
              } else if (subject.includes("실패")) {
                subject +=
                  "메일 주소를 다시 확인해 주세요 " +
                  header.body.date[0] +
                  "에 발송됨";
                subjects.push(subject);
              }
            });
            return subjects;
          });
      });
    });
    return result;
  },
};

//imap 연결 구성
//tls ssl 사용 구성
//connection 옵션중 searchCriteria -> 읽을 옵션

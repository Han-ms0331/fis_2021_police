let danger_list = [
  "강원도",
  "경상남도",
  "경상북도",
  "전라남도",
  "전라북도",
  "제주도",
  "울산광역시 울주군",
  "인천광역시 웅진군",
  "경기도 가평",
  "경기도 광주",
  "경기도 동두천",
  "경기도 양주",
  "경기도 양평",
  "경기도 여주",
  "경기도 연천",
  "경기도 이천",
  "경기도 포천",
  "충청남도 계룡",
  "충청남도 공주",
  "충청남도 금산",
  "충청남도 논산",
  "충청남도 당진",
  "충청남도 보령",
  "충청남도 부여",
  "충청남도 서산",
  "충청남도 서천",
  "충청남도 예산",
  "충청남도 청양",
  "충청남도 태안",
  "충청남도 홍성",
  "충청북도 괴산",
  "충청북도 단양",
  "충청북도 영동",
  "충청북도 옥천",
  "충청북도 음성",
  "충청북도 제천",
  "충청북도 증평",
  "충청북도 진천",
];

let danger_list2 = ["경기도 평택", "경기도 화성", "경기도 안성"];

let except_list_p = ["안중읍", "청북읍", "진위면"];

let except_list_a = ["공도읍"];

let except_list_w = ["병점", "동탄", "효행로"];

export default  {
  check_danger: (address) => {
    for (let element of danger_list) {
      if (address.includes(element)) {
        return 1;
      }
    }
    for (let element of danger_list2) {
      if (address.includes(element)) {
        if (element == "경기도 평택") {
          for (let element2 of except_list_p) {
            if (address.includes(element2)) {
              return 0;
            }
          }
        }
        if (element == "경기도 화성") {
          for (let element2 of except_list_w) {
            if (address.includes(element2)) {
              return 0;
            }
          }
        }
        if (element == "경기도 안성") {
          for (let element2 of except_list_a) {
            if (address.includes(element2)) {
              return 0;
            }
          }
        }
        else return 1;
      }
    }
    return 0;
  },
};

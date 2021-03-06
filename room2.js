// 복도로 돌아가기 버튼
const backBtn = document.querySelector('button.back');
backBtn.addEventListener('click', function () {
  location.href = "index.html#section2";
})


// h4 왼쪽 영역을 text 왼쪽 영역과 같게 하기
const pText = document.querySelector('.pText');
const h4 = document.querySelector('h4');
function equalizeLeft() {
  let leftWidth = pText.offsetLeft;
  h4.style.marginLeft = `${leftWidth}px`;
  h4.classList.remove('hidden');
}
window.addEventListener('load', equalizeLeft);
window.addEventListener('resize', equalizeLeft);


// ❔ 대답 열기
const answer = document.querySelector('.answer');
const questionBtn = document.querySelector('.questionBtn');

function toggleAnswer() {
  answer.classList.toggle('invisible');
}
questionBtn.addEventListener('click', toggleAnswer);


// Typing animation
window.addEventListener('load', startType);
function startType() {
  String.prototype.toTypingText = function () {
    const cCho = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
    cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ],
    cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ];
    let cho, jung, jong;

    let chars = [];
    for (let i = 0; i < this.length; i++) {
      let cCode = this.charCodeAt(i);
      // 띄어쓰기 변환
      if (cCode == 32) {
        chars.push(" ");
        continue;
      }

      // 한글이 아닐 경우
      if (cCode < 0xAC00 || cCode > 0xD7A3) {
       chars.push(this.charAt(i));
       continue;
      }

      // 한글일 경우
      cCode = this.charCodeAt(i) - 0xAC00;
      jong = cCode % 28; // 종성
      jung = ((cCode - jong) / 28 ) % 21; // 중성
      cho = (((cCode - jong) / 28 ) - jung ) / 21; // 초성

      // 텍스트 -> ㅌ테텍ㅅ스ㅌ트 형식으로 저장
      chars.push(cCho[cho]); // 초성
      chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung * 28))); // 초성 + 중성
      if (cJong[jong] !== "") {
        chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung * 28) + jong ));
      } // 종성 있으면 초성 + 중성 + 종성

    }
    return chars;
  }

  let liIndex = 0;
  let text = document.querySelectorAll('.typingTextList')[liIndex].innerText;
  text = text.split(''); // 한 글자씩 자르기

  // 각 글자 초성, 중성, 종성으로 나누기
  let typingTextArray = [];
  for (let i = 0; i < text.length; i++) {
    typingTextArray[i] = text[i].toTypingText();
  }

  const typingPlace = document.querySelector('.typing');
  const typingTextList = document.querySelectorAll('.typingTextList');

  let inter = setInterval(type, 180);

  let typingText = "";
  let i = 0;
  let j = 0;
  let del = -1;

  function type() {
    // 글자 수만큼 반복 후 종료
    if (i <= typingTextArray.length - 1) {
      // 각 글자 초성-중성-종성 순서대로 추가
      typingPlace.innerHTML = typingText + typingTextArray[i][j];
      j++;
      if (j == typingTextArray[i].length) {
        typingText += typingTextArray[i][j-1]; // 초-중-종 순서대로 출력된 글자는 저장 (다음 글자와 이어붙이기 위해)
        i++;
        j = 0;
      }

      // 한 문장 다 쓰고 1초 쉬기
      if (i == typingTextArray.length) {
        clearInterval(inter);
        setTimeout(function () {
          inter = setInterval(type, 100);
        }, 3000);
      }
    } else {

      // 한 문장 끝나면
      if (-typingTextArray.length - 1 < del) {
        // 한 글자씩 지우기
        typingPlace.innerHTML = typingText.slice(0, del);
        del--;
      } else {
        // li 개수 다 채우면 다시 처음 li부터 시작
        if (liIndex == typingTextList.length - 1) {
          liIndex = 0;
        } else {
          // li 개수 다 안 채웠으면 다음 li 문장으로 넘어가기
          liIndex++;
        }


        // 변수 초기화
        typingText = "";
        i = 0;
        del = -1;
        // 다음 문장 불러오기
        text = typingTextList[liIndex].innerText;
        text = text.split(''); // 한 글자씩 자르기
        // 다음 문장 각 글자 초성, 중성, 종성으로 나누기
        typingTextArray = [];
        for (let i = 0; i < text.length; i++) {
          typingTextArray[i] = text[i].toTypingText();
        }

        // 1초 후 다음 문장 타이핑
        clearInterval(inter);
        setTimeout(function () {
          inter = setInterval(type, 180);
        }, 300);
      }
    }
  }
}

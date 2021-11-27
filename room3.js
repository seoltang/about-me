// 복도로 돌아가기 버튼
const backBtn = document.querySelector('button.back');
backBtn.addEventListener('click', function () {
  location.href = "index.html#section2";
})


// 비디오 너비 아래 문단과 맞추기
const divText = document.querySelector('.divText');
const video = document.querySelector('video');
function equalizeVideoWidth() {
  let videoWidth = divText.offsetWidth;
  video.style.width = `${videoWidth}px`;
}
window.addEventListener('load', equalizeVideoWidth);
window.addEventListener('resize', equalizeVideoWidth);


// '둘러봐' 버튼 누르면 비디오 보이게 하기 (토글)
const startBtn = document.querySelector('.startBtn');
startBtn.addEventListener('click', function () {
  video.classList.toggle('hidden');
});


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

  let inter = setInterval(type, 150);

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
    } else {
      clearInterval(inter);

      // 커서 깜박거림 멈추기
      const typing = document.querySelector('.typing');
      setInterval(function() {
        typing.style.animation = "paused";
      }, 2500);
    }
  }
}

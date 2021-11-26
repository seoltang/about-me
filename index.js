// 문 클릭 시 퀴즈 모달 창 열기
const doorList = document.querySelectorAll('.door');
const modalBackground = document.querySelector('.modalBackground');
const modalBoxList = document.querySelectorAll('.modalBox');
const closeModalBtnList = document.querySelectorAll('.closeModalBtn');
const roomIndex = ["첫", "두"];


for (let i = 0; i < doorList.length - 1; i++) {
  function openDoor() {
    // 이전 방 아직 안 열었으면 먼저 열도록 모달 창으로 알리기
    let roomOpenedBool = localStorage.getItem(`room${i + 1}Opened`);
    if (roomOpenedBool !== "true") {
      // 모달 창 내용 변경
      modalBoxList[i].innerHTML = "<div>" + roomIndex[i] + " 번째 방을 먼저 열어 주세요.</div>";
      // 모달 창 띄우기
      modalBackground.classList.remove('hidden');
      modalBoxList[i].classList.remove('hidden');
      doorList[i+1].style.zIndex = "2";
    } else {
      // localStorage에 비밀번호가 저장되어 있으면 바로 방으로 이동
      let passwordSaved = localStorage.getItem(`password${i}`);
      if (passwordSaved === passwordAnswerList[i]) {
        location.href = `room${i + 2}.html`;
      } else {
        // 비밀번호가 저장되어 있지 않으면 모달 창 띄우기
        modalBackground.classList.remove('hidden');
        modalBoxList[i].classList.remove('hidden');
        doorList[i+1].style.zIndex = "2";
      }
    }
  }
  // 모달 창 닫기
  function closeDoor() {
    modalBackground.classList.add('hidden');
    modalBoxList[i].classList.add('hidden');
    doorList[i+1].style.zIndex = "auto";
  }
  doorList[i+1].addEventListener('click', openDoor);
  modalBackground.addEventListener('click', closeDoor);
  closeModalBtnList[i].addEventListener('click', closeDoor);
}


// room1 들어가기
doorList[0].addEventListener('click', function () {
  location.href = "room1.html";
  // room1 오픈 여부 localStorage에 저장
  localStorage.setItem('room1Opened', true);
})


// room2-3 비밀번호 맞히면 들어가기
const passwordList = document.querySelectorAll('input.password');
const passwordAnswerList = ["박겸영", "0619"];
const formList = document.querySelectorAll('form');
// room 2부터 3까지 반복
for (let i = 0; i < passwordList.length; i++) {
  function checkPassword(event) {
    event.preventDefault();

    // 정답이 맞으면
    if (passwordList[i].value === passwordAnswerList[i]) {
      // 비밀번호 localStorage에 저장
      localStorage.setItem(`password${i}`, passwordAnswerList[i]);
      // 방으로 이동
      location.href = `room${i + 2}.html`;
      // room 오픈 여부 localStorage에 저장
      localStorage.setItem(`room${i + 2}Opened`, true);
    } else {
      // 정답 틀리면 모달 창 shake
      modalBoxList[i].style.animation = "shake 0.05s linear 5 running";
      let stopShake = setTimeout(function () {
        modalBoxList[i].style.animation = "paused";
      }, 250);
    }
  }
  formList[i].addEventListener('submit', checkPassword);
}


// 힌트 열기
const hintBtnList = document.querySelectorAll('.hintBtn');
const hintTextList = document.querySelectorAll('.hintText');
const answerBtnList = document.querySelectorAll('.answerBtn');
const answerTextList = document.querySelectorAll('.answerText');

for (let i = 0; i < hintBtnList.length; i++) {
  hintBtnList[i].addEventListener('click', function () {
    hintTextList[i].classList.remove('hidden');
    answerBtnList[i].classList.remove('hidden');
  });
  // 정답 열기
  answerBtnList[i].addEventListener('click', function () {
    answerTextList[i].classList.remove('hidden');
  })
}

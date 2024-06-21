function getRandomNumbers() {
  const numbers = Array.from({
    length: 10
  }, (_, i) => i); // 0부터 9까지의 숫자 배열 생성

  //const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 0부터 9까지의 숫자 배열 생성

  const result = [];

  /* 중복되지 않게 3개 수 배열 생성 */
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length); // 난수 생성
    result.push(numbers[randomIndex]); // 난수에 해당하는 숫자를 결과 배열에 추가
    numbers.splice(randomIndex, 1); // 사용된 숫자는 배열에서 제거하여 중복을 방지
  }

  return result; // 중복되지 않는 세 자리 숫자 배열 반환
}

function getSB(secret, guess) {
  let strikes = 0;
  let balls = 0;

  for (let i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) {
      strikes++; // 숫자와 위치가 모두 일치할 경우 strikes 증가
    } else if (secret.includes(guess[i])) {
      balls++; // 숫자는 일치하지만 위치는 다를 경우 balls 증가
    }
  }

  return {
    strikes,
    balls
  }; // strikes와 balls 값을 객체로 반환
}

const secretNumbers = getRandomNumbers();
let cnt = 0;
let end = false;

document.getElementById('secretNumbers').textContent = `Secret Numbers (for debugging): ${secretNumbers.join('')}`;

function processGuess() {
  if (end) return; // 게임 종료 시 함수 실행을 중단
  const guess = document.getElementById('userInput').value; // 사용자가 입력한 숫자를 가져오기
  if (guess.length !== 3 || !/^\d{3}$/.test(guess)) { // 입력값이 세 자리 숫자인지 검사
    alert("세자리 숫자를 입력하세요 (예: 123)");
    return;
  }

  const guessNumbers = Array.from(guess).map(Number); // 입력값을 숫자 배열로 변환
  cnt++; //시도 횟수 증가

  const {
    strikes,
    balls
  } = getSB(secretNumbers, guessNumbers); // 비밀 숫자와 추측 숫자를 비교하여 strikes와 balls를 계산

  // 결과를 HTML 요소에 추가하여 표시
  const attemptsElement = document.getElementById('attempts');
  const resultElement = document.getElementById('result');

  // 시도 결과와 줄 바꿈을 추가하여 표시
  attemptsElement.innerHTML += `${cnt}번째 시도: ${guessNumbers.join('')} -> ${strikes}S ${balls}B<br>`;

  // 정답을 맞춘 경우 처리
  if (strikes === 3) {
    resultElement.innerHTML = `${cnt}번만에 맞히셨습니다. 게임을 종료합니다.`;
    document.getElementById('userInput').disabled = true; // 입력 필드 비활성화
    document.getElementById('submitButton').disabled = true; // 버튼 비활성화
    end = true; //게임 종료 상태로 변경
  }
}
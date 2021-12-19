let lmodel;
const my_video = document.getElementById('video'); //captcha.html 파일에서 웹캠 화면을 띄우는 태그를 저장함
const my_canvas = document.getElementById('canvas'); //captcha.html파일에서 손 모양을 표시하는 박스를 띄우기 위한 캔버스 태그를 저장함
const context = my_canvas.getContext('2d'); //저장한 캔버스 태그를 그림을 2d로 설정

const order = [
    //인증을 받기 위해 진행해야 할 미션들
    {
        order: ' 부저음이 울리면 손바닥을 펴세요. ',
        label: 'open'
    },
    {
        order: ' 부저음이 울이면 검지손가락만 펴세요. ',
        label: 'point'
    },
    {
        order: ' 부저음이 울리면 주먹을 쥐세요. ',
        label: 'closed'
    },
    {order: '카메라에 주먹을 보여주세요. 그리고 첫번째 '},
    {order: ' 두번째 '}
];
const order2 = [
    //인증을 받기 위해 진행해야 할 미션들
    {
        order: ' 부저음이 울리면 손바닥을 펴세요. ',
        label: 'open'
    },
    {
        order: ' 부저음이 울이면 검지손가락만 펴세요. ',
        label: 'point'
    },
    {
        order: ' 부저음이 울리면 주먹을 쥐세요. ',
        label: 'closed'
    },
    {order: '카메라에 주먹을 보여주세요. 그리고 첫번째 '},
    {order: ' 두번째 '}
];
const voice_order = [
    '다음 동물 이름을 듣고 첫번째 음절을 소리내서 읽으세요. ',
    '다음 동물 이름을 듣고 두번째 음절을 소리내서 읽으세요. ',
    '다음 동물 이름을 듣고 세번째 음절을 소리내서 읽으세요. '
];
const animal = [
    {
        order: ' 강아지',
        label_1: '강',
        label_2: '아',
        label_3: '지'
    },
    {
        order: ' 고양이',
        label_1: '고',
        label_2: '양',
        label_3: '이'
    },
    {
        order: ' 돌고래',
        label_1: '돌',
        label_2: '고',
        label_3: '래'
    },
    {
        order: ' 호랑이',
        label_1: '호',
        label_2: '랑',
        label_3: '이'
    },
    {
        order: ' 비둘기',
        label_1: '비',
        label_2: '둘',
        label_3: '기'
    },
    {
        order: ' 미어캣',
        label_1: '미',
        label_2: '어',
        label_3: '캣'
    },
    {
        order: ' 까마귀',
        label_1: '까',
        label_2: '마',
        label_3: '귀'
    },
    {
        order: ' 너구리',
        label_1: '너',
        label_2: '구',
        label_3: '리'
    },
    {
        order: ' 캥거루',
        label_1: '캥',
        label_2: '거',
        label_3: '루'
    },
    {
        order: ' 코끼리',
        label_1: '코',
        label_2: '끼',
        label_3: '리'
    }
];
let number = Math.floor(Math.random() * 2); //위의 미션들중 하나를 랜덤으로 선택
localStorage.setItem("firstOrder", order[number].label);

order2.splice(number, 1);

let number2 = Math.floor(Math.random() * 2);
localStorage.setItem("secondOrder", order2[number2].label);

let voice_number = Math.floor(Math.random() * 3);
let animal_number = Math.floor(Math.random() * 10);

const now = new Date();
const timestamp = `${now.getDate()}:${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`; //timestamp

localStorage.setItem('timestamp', timestamp); //만들어진 timestamp를 localstorage에 저장
localStorage.setItem('mission_num', number); //골라진 미션의 번호를 localstorage에 저장

/*
    함수이름: speak
    기능: order에서 골라진 명령을 tts로 읽어주는 함수
    인자: text-읽을 명령을 받음, opt_prop-속도 음의 높낮이 등 tts설정을 받음
*/

function speak(text, opt_prop) {
    if (
        typeof SpeechSynthesisUtterance === 'undefined' ||
        typeof window.speechSynthesis === 'undefined'
    ) {
        alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
        return;
    }

    window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화

    const prop = opt_prop || {};

    const speechMsg = new SpeechSynthesisUtterance();
    speechMsg.rate = prop.rate || 1; // 속도: 0.1 ~ 10
    speechMsg.pitch = prop.pitch || 1; // 음높이: 0 ~ 2
    speechMsg.lang = prop.lang || 'ko-KR';
    speechMsg.text = text;

    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg);
}

const btnRead = document.getElementById('read-btn');

btnRead.addEventListener('click', (e) => {
    //html에 구현된 음성 출력 버튼을 눌렀을때 실행되는 함수
    speak(order[3].order + order[number].order + order[4].order + order2[number2].order, {
        //speak함수를 호출
        rate: 1,
        pitch: 1,
        lang: 'ko-KR',
    });
});



window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let speakResult =""
let recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'ko-KR';


recognition.onresult = (e) => {
    console.log(e.results);
    console.log(e.results[0][0].transcript);
    speakResult = e.results[0][0].transcript;
    recognition.stop();
}


const term = [2000, 2500, 3000, 3500, 4000]
let closeCount = 0;
let openCount = 0;
let termNum = Math.floor(Math.random() * 5);
let drawData = []; //서버에 보낼 데이터를 담는 배열
let facedetect = false;

const firstOrder = localStorage.getItem("firstOrder");
console.log(firstOrder);
const secondOrder = localStorage.getItem("secondOrder");
console.log(secondOrder);

let speakTarget;
if (voice_number === 0) {
    speakTarget = animal[animal_number].label_1;
} else if (voice_number === 1) {
    speakTarget = animal[animal_number].label_2;
} else if (voice_number === 2) {
    speakTarget = animal[animal_number].label_3;
}
console.log(speakTarget);

let result;
let fpsSum = 0;
let fpsCount = 0;

my_video.style.display = 'none'; //처음에는 화면에 웹캠을 표시하지 ㅇ않음

const labelMap1 = {
    1: 'open',
    2: 'closed',
    5: 'face',
}; //handtrack모듈에서 상용하는 파라미터를 위한 객체

/*
	함수이름: send_data
	기능: 인자로 받은 데이터를 서버로 보낸다
	인자: data-서버로 보낼 데이터를 입력받음
*/
function send_data(time, count, speakRes, speakTar) {
    const averageFPS = fpsSum / fpsCount;
    let data = {
        time: time,
        count: count,
        averageFPS: averageFPS,
        speakTarget: speakTar,
        speakResult: speakRes
    }

    fetch('http://34.64.253.187:3000/authentication', {
        //서버와 url로 통신하는 fetch함수를 사용
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        return response.json()
    }).then((data) => {
        if (data.result === 'success') {
            console.log("success");
            my_video.style.display = 'none';
            alert("인증에 성공하였습니다")
        } else {
            console.log("fail");
            my_video.style.display = 'none';
            alert("인증에 실패하였습니다")
        }
    })

}

/*
	함수이름: start_video
	기능: 웹캠을 띄울 캕버스를 설정함
	인자: 없음
*/
function start_video() {
    var video = document.querySelector('#video');
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then(function (stream) {
                video.srcObject = stream;
                setInterval(run_detection, 10);
            })
            .catch(function (err0r) {
                console.log(err0r);
            });
    }
}


/*
	함수이름: run_detection
	기능: 웹캠에 띄워진 손을 인식하여 그림을 그리고 그림의 좌표들을 배열에 담음
	인자: 없음
*/
async function run_detection() {
    lmodel.detect(my_video).then((predictions) => {
        lmodel.renderPredictions(predictions, my_canvas, context, video);
        fpsSum += lmodel.getFPS();
        fpsCount++;
        if ((predictions[0].label === 'face') && facedetect === false) {
            speak(order[3].order + order[number].order + order[4].order + order2[number2].order, {
                //speak함수를 호출
                rate: 1,
                pitch: 1,
                lang: 'ko-KR',
            });
            facedetect = true;
        }
        if ((predictions[1].label === 'closed' || predictions[0].label === 'closed') && closeCount === 0 && facedetect) {
            closeCount++;
            beep();
        }
        if (closeCount >= 1 && (predictions[1].label === firstOrder || predictions[0].label === firstOrder)) {
            if (closeCount === 1) {
                closeCount++;
            }
            openCount++;
            //console.log(openCount);
        }
        if (closeCount > 1 && (predictions[1].label === secondOrder || predictions[0].label === secondOrder)) {
            closeCount = -1
            console.log(openCount);
            // console.log(fpsSum / fpsCount);
            // console.log("0.004 :"+term[termNum]*0.001);
            // console.log("0.004 :"+term[termNum]*0.002);
            // console.log("0.004 :"+term[termNum]*0.003);
            // console.log("0.004 :"+term[termNum]*0.004);
            // console.log("0.005 :"+term[termNum]*0.005);
            // console.log("0.01 :"+term[termNum]*0.01);
            // console.log("0.015 :"+term[termNum]*0.015);
            // console.log("0.02 :"+term[termNum]*0.02);
            // console.log("0.025 :"+term[termNum]*0.025);
            // console.log("0.03 :"+term[termNum]*0.03);
            // console.log("0.035 :"+term[termNum]*0.035);
            // console.log("0.04 :"+term[termNum]*0.04);
            // console.log("0.045 :"+term[termNum]*0.045);
            speak(voice_order[voice_number] + animal[animal_number].order, {
                //speak함수를 호출
                rate: 1,
                pitch: 1,
                lang: 'ko-KR',
            })
            sleep(5000).then(() => {
                recognition.start();
                sleep(5000).then(() => {
                    console.log(speakResult);
                    console.log(speakTarget === speakResult);
                    send_data(term[termNum], openCount, speakResult, speakTarget)
                });
            })
        }
    });
}

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
    sleep(term[termNum]).then(() => snd.play());
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}


const modelParams = {
    //handtrack 모듈에 사용되는  설정값들
    flipHorizontal: true, // flip e.g for video
    imageScaleFactor: 0.6, // reduce input image size for gains in speed.
    maxNumBoxes: 2, // maximum number of boxes to detect
    iouThreshold: 0.7, // ioU threshold for non-max suppression
    scoreThreshold: 0.7, // confidence threshold for predictions.
};


handTrack.load(modelParams).then((model) => {
    //handtrack 모듈을 불러옴
    lmodel = model;
    // console.log(model.getModelParameters());
    btn_loading.style.display = 'none';
    start_video();
});

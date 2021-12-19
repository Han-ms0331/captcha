if (document.getElementById('cur-ymd') && document.getElementById('cur-day') && document.getElementById('cur-time')) {
    let curDate = new Date();
    let weekName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    document.getElementById('cur-ymd').textContent =
        curDate.getFullYear() + '년 ' + (curDate.getMonth() + 1) + '월 ' + curDate.getDate() + '일';
    document.getElementById('cur-day').textContent = weekName[curDate.getDay()];
    document.getElementById('cur-time').textContent = curDate.toLocaleTimeString();
}
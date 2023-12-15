const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img')

const music = new Audio()

const songs = [
    {
        path: 'Assets/BIG SHOT(MP3_320K).mp3',
        displayName: 'BIG SHOT',
        cover: 'Assets/DELTARUNE_Chapter_2_OST.webp',
        artist: 'Toby Fox',
    },
    {
        path: 'Assets/Deltarune Chapter 2 OST_ 06 - A CYBER_S WORLD_(MP3_320K).mp3',
        displayName: 'A Cyber\'s World?',
        cover: 'Assets/DELTARUNE_Chapter_2_OST.webp',
        artist: 'Toby Fox',
    },
    {
        path: 'Assets/Earthbound - 53 - Sanctuary Guardian(MP3_160K).mp3',
        displayName: 'Sanctuary Guardian',
        cover: 'Assets/Earthbound.jpg',
        artist: 'Keiichi Suzuki, Hirokazu Tanaka',
    }
]

let musicIndex = 0
let isPlaying = false

function togglePlay() {
    if (isPlaying) {
        pauseMusic()
    } else {
        playMusic()
    }
}

function playMusic() {
    isPlaying = true
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause')
    // Set button hover title
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

function pauseMusic() {
    isPlaying = false
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play')
    // Set button hover title
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

function loadMusic(song) {
    music.src = song.path
    title.textContent = song.displayName
    artist.textContent = song.artist
    image.src = song.cover
    background.src = song.cover
}
//CURSE OF RA 𓀀 𓀁 𓀂 𓀃 𓀄 𓀅 𓀆 𓀇 𓀈 𓀉 𓀊 𓀋 𓀌 𓀍 𓀎 𓀏 𓀐 𓀑 𓀒 𓀓 𓀔 𓀕 𓀖 𓀗 𓀘 𓀙 𓀚 𓀛 𓀜 𓀝 𓀞 𓀟 𓀠 𓀡 𓀢 𓀣 𓀤 𓀥 𓀦 𓀧 𓀨 𓀩 𓀪 𓀫 𓀬 𓀭 𓀲 𓀳 𓀴 𓀵 𓀶 𓀷 𓀸 𓀹 𓀺 𓀻 𓀼 𓀽 𓀾 𓀿 𓁀 𓁁 𓁂 𓁃 𓁄 𓁅 𓁆 𓁇 𓁈 𓁉 𓁊 𓁋 𓁍 𓁎 𓁏 𓁐 𓁑

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0')
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth
    const clickX = e.offsetX
    music.currentTime = (clickX / width) * music.duration
}

playBtn.addEventListener('click', togglePlay)
prevBtn.addEventListener('click', () => changeMusic(-1))
nextBtn.addEventListener('click', () => changeMusic(1))
music.addEventListener('ended', () => changeMusic(1))
music.addEventListener('timeupdate', updateProgressBar)
playerProgress.addEventListener('click', setProgressBar)

loadMusic(songs[musicIndex])
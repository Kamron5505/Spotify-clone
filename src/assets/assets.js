// === ICONS ===
import bell_icon from './bell.png'
import home_icon from './home.png'
import like_icon from './like.png'
import loop_icon from './loop.png'
import mic_icon from './mic.png'
import next_icon from './next.png'
import play_icon from './play.png'
import pause_icon from './pause.png'
import plays_icon from './plays.png'
import prev_icon from './prev.png'
import search_icon from './search.png'
import shuffle_icon from './shuffle.png'
import speaker_icon from './speaker.png'
import stack_icon from './stack.png'
import zoom_icon from './zoom.png'
import plus_icon from './plus.png'
import arrow_icon from './arrow.png'
import mini_player_icon from './mini-player.png'
import queue_icon from './queue.png'
import volume_icon from './volume.png'
import arrow_right from './right_arrow.png'
import arrow_left from './left_arrow.png'
import spotify_logo from './spotify_logo.png'
import spotify_premium from './spotify-premium.jpg'
import clock_icon from './clock_icon.png'

// === IMAGES ===
import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'
import img6 from './img6.jpg'
import img7 from './img7.jpg'
import img8 from './img8.jpg'
import img9 from './img9.jpg'
import img10 from './img10.jpg'
import img11 from './img11.jpg'
import img12 from './img12.jpg'
import img13 from './img13.jpg'
import img14 from './img14.jpg'

// === ALBUM COVERS ===
import album1 from './album1.jpg'
import album2 from './album2.jpg'
import album3 from './album3.jpg'
import album4 from './album4.jpg'
import album5 from './album5.jpg'
import album6 from './album6.jpg'

// === SONG FILES ===
import song1 from './song1.mp3'
import song2 from './song2.mp3'
import song3 from './song3.mp3'
import song4 from './song4.mp3'
import song5 from './song5.mp3'
import song6 from './song6.mp3'
import song7 from './song7.mp3'
import song8 from './song8.mp3'
import song9 from './song9.mp3'
import song10 from './song10.mp3'
import song11 from './song11.mp3'
import song12 from './song12.mp3'
import song13 from './song13.mp3'
import song14 from './song14.mp3'

// === EXPORT ICONS ===
export const assets = {
    bell_icon,
    home_icon,
    like_icon,
    loop_icon,
    mic_icon,
    next_icon,
    play_icon,
    pause_icon,
    plays_icon,
    prev_icon,
    search_icon,
    shuffle_icon,
    speaker_icon,
    stack_icon,
    zoom_icon,
    plus_icon,
    arrow_icon,
    mini_player_icon,
    queue_icon,
    volume_icon,
    arrow_left,
    arrow_right,
    spotify_logo,
    clock_icon,
    spotify_premium,
}

// === ALBUM DATA ===
export const albumsData = [
    {
        id: 0,
        name: "Top 50 Global",
        image: album1,
        desc: "Your weekly update of the most played tracks worldwide.",
        bgColor: "#2a4365"
    },
    {
        id: 1,
        name: "Top 50 India",
        image: album2,
        desc: "Your weekly update of the most played tracks worldwide.",
        bgColor: "#22543d"
    },
    {
        id: 2,
        name: "Trending India",
        image: album3,
        desc: "Your weekly update of the most played tracks worldwide.",
        bgColor: "#44337a"
    },
    {
        id: 3,
        name: "Trending Global",
        image: album6,
        desc: "Your weekly update of the most played tracks worldwide.",
        bgColor: "#44337a"
    },
    {
        id: 4,
        name: "Mega Hits",
        image: album4,
        desc: "Your weekly update of the most played tracks worldwide.",
        bgColor: "#234e52"
    },
    {
        id: 5,
        name: "Happy Favorites",
        image: album5,
        desc: "Your weekly update of the most played tracks worldwide.",
        bgColor: "#744210"
    }
]

// === SONG DATA ===
export const songsData = [
    {
        id: 1,
        name: "Sprinter",
        file: song1,
        duration: "3:41",
        desc: "Fast rhythm and confidence — the perfect soundtrack for your drive forward.",
        image: img1,
        bgColor: "#2a4365"
    },
    {
        id: 2,
        name: "Shape of You",
        file: song2,
        duration: "3:53",
        desc: "Rhythm, love, and energy — dance like no one’s watching.",
        image: img2,
        bgColor: "#22543d"
    },
    {
        id: 3,
        name: "Blinding Lights",
        file: song7,
        duration: "3:20",
        desc: "City lights and wild energy — feel the pulse of the night.",
        image: img7,
        bgColor: "#744210"
    },
    {
        id: 4,
        name: "Dardim",
        file: song4,
        duration: "3:36",
        desc: "Emotions, passion, and Eastern vibes — a sound that touches the soul.",
        image: img4,
        bgColor: "#234e52"
    },
    {
        id: 5,
        name: "Asphalt 8",
        file: song5,
        duration: "2:58",
        desc: "Speed, freedom, and adrenaline — turn up the volume and go.",
        image: img5,
        bgColor: "#744210"
    },
    {
        id: 6,
        name: "Give It To Me",
        file: song6,
        duration: "3:08",
        desc: "Confidence and fire — nothing can stop you.",
        image: img6,
        bgColor: "#7b341e"
    },
    {
        id: 7,
        name: "Dance Monkey",
        file: song3,
        duration: "3:29",
        desc: "Fun, freedom, and rhythm — just dance your heart out.",
        image: img3,
        bgColor: "#44337a"
    },
    {
        id: 8,
        name: "Mockingbird",
        file: song8,
        duration: "4:11",
        desc: "Emotional lyrics and raw honesty — music that hits deep.",
        image: img8,
        bgColor: "#322659"
    },
    {
        id: 9,
        name: "Calm Down",
        file: song9,
        duration: "3:59",
        desc: "Smooth Afrobeat groove — relax and let the rhythm flow.",
        image: img9,
        bgColor: "#234e52"
    },
    {
        id: 10,
        name: "День и ночь",
        file: song10,
        artist: "Мот",
        duration: "3:07",
        desc: "A love story in motion — day and night merge in one heartbeat.",
        image: img10,
        bgColor: "#2c5282"
    },
    {
        id: 11,
        name: "ЕВА",
        file: song11,
        artist: "Винтаж",
        duration: "3:07",
        desc: "Mysterious and sensual — a song about love beyond time.",
        image: img11,
        bgColor: "#2c5282"
    },
    {
        id: 12,
        name: "Yoron Ey",
        file: song12,
        artist: "Shoxrux",
        duration: "3:26",
        desc: "Modern rhythm meets Eastern soul — a track full of energy.",
        image: img12,
        bgColor: "#2c5282"
    },
    {
        id: 13,
        name: "Раневская",
        file: song13,
        artist: "Акмаль",
        duration: "3:47",
        desc: "Deep lyrics and wisdom — music with meaning and character.",
        image: img13,
        bgColor: "#2c5282"
    },
    {
        id: 14,
        name: "BAND4BAND",
        file: song14,
        artist: "Central Cee ft. Lil Baby",
        duration: "2:20",
        desc: "Bold flow and energy — UK and US styles collide in one fire track.",
        image: img14,
        bgColor: "#2c5282"
    }
];

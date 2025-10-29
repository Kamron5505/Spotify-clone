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
// import img7 from './img7.jpg'
// import img8 from './img8.jpg'
// import img9 from './img9.jpg'
// import img10 from './img10.jpg'
// import img11 from './img11.jpg'
// import img12 from './img12.jpg'
// import img13 from './img13.jpg'
// import img14 from './img14.jpg'

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
// import song7 from './song7.mp3'
// import song8 from './song8.mp3'

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
export const songsData = [
    {
        id: 1,
        name: "Sprinter",
        artist: "The Weeknd",
        file: song1,
        duration: "3:41",
        desc: "Hit the road with this smooth weekend vibe.",
        image: img1,
        bgColor: "#2a4365"
    },
    {
        id: 2,
        name: "Shape of You",
        artist: "Ed Sheeran",
        file: song2,
        duration: "3:53",
        desc: "Move to the rhythm of love and energy.",
        image: img2,
        bgColor: "#22543d"
    },
    {
        id: 3,
        name: "Dance Monkey",
        artist: "Tones and I",
        file: song3,
        duration: "3:29",
        desc: "Jump, dance, and feel the groove all around.",
        image: img3,
        bgColor: "#44337a"
    },
    {
        id: 4,
        name: "Dardim",
        artist: "Yunka",
        file: song4,
        duration: "2:48",
        desc: "Lift your mood with this cosmic pop beat.",
        image: img4,
        bgColor: "#234e52"
    },
    {
        id: 5,
        name: "Asphalt 8",
        artist: "Macan",
        file: song5,
        duration: "2:21",
        desc: "Turn up the feels with this emotional anthem.",
        image: img5,
        bgColor: "#744210"
    },
    {
        id: 6,
        name: "Give It To Me",
        artist: "Timbaland,  Nelly Furtado, Justin Timberlake",
        file: song6,
        duration: "3:56",
        desc: "Find your power and bloom with confidence.",
        image: img6,
        bgColor: "#7b341e"
    },
    // {
    //     id: 7,
    //     name: "As It Was",
    //     artist: "Harry Styles",
    //     duration: "2:47",
    //     desc: "Take a moment to reflect and just be.",
    //     image: img7,
    //     bgColor: "#744210"
    // },
    // {
    //     id: 8,
    //     name: "Unholy",
    //     artist: "Sam Smith ft. Kim Petras",
    //     duration: "2:37",
    //     desc: "Dive into the dark side of pop energy.",
    //     image: img8,
    //     bgColor: "#322659"
    // },
    // {
    //     id: 9,
    //     name: "Calm Down",
    //     artist: "Rema & Selena Gomez",
    //     duration: "3:59",
    //     desc: "Relax and sway to smooth Afrobeat vibes.",
    //     image: img9,
    //     bgColor: "#234e52"
    // },
    // {
    //     id: 10,
    //     name: "Industry Baby",
    //     artist: "Lil Nas X & Jack Harlow",
    //     duration: "3:32",
    //     desc: "Confidence and fire — nothing can stop you.",
    //     image: img10,
    //     bgColor: "#2c5282"
    // }
];

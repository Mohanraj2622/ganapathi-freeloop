document.addEventListener("DOMContentLoaded", () => {
  const savedTrack = localStorage.getItem("currentTrack");
  if (savedTrack) {
    const track = JSON.parse(savedTrack);
    playSong(track);
    localStorage.removeItem("currentTrack"); // Remove to prevent replay
  }
});

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && (event.key === "=" || event.key === "-" || event.key === "0")) {
    event.preventDefault();
  }
});

document.addEventListener("wheel", function (event) {
  if (event.ctrlKey) {
    event.preventDefault();
  }
}, { passive: false });

// WebViewString Communication with MIT App Inventor
function updateAppInventorState(state) {
  if (window.AppInventor) {
    window.AppInventor.setWebViewString(state);
  }
}

// Function to send a message to MIT App Inventor about Media Session status
function updateAppInventorWithMediaSessionStatus(status) {
  if (window.AppInventor) {
    window.AppInventor.setWebViewString("MediaSessionStatus: " + status);
  }
}

// Media Session API Integration
function setupMediaSession() {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler("play", playSong);
    navigator.mediaSession.setActionHandler("pause", pauseSong);
    navigator.mediaSession.setActionHandler("nexttrack", playNextSong);
    navigator.mediaSession.setActionHandler("previoustrack", playPrevSong);

    // Inform App Inventor that the Media Session is enabled
    updateAppInventorWithMediaSessionStatus("Media Session Enabled");
  } else {
    // Inform App Inventor that the Media Session is not supported
    updateAppInventorWithMediaSessionStatus("Media Session Not Supported");
  }
}

// Existing code remains the same
const SONGS = [
  // 1 list
  {
    title: "ஒன்பது_கோளும்_முதல்_முறையாக",
    artist: "vinayagar",
    url: "ஒன்பது_கோளும்___முதல்_முறையாக_முழு_பாடல்_வரிகளுடன்___Onbathu_Kolum_Lyric_Video_Tamil___English(256k).mp3",
    coverUrl: "ganapathi-3.jpg",
  },
  {
    title: "அப்பா_அப்பா_கணேசா__Vinayagar_Song",
    artist: "vinayagar",
    url: "Appa_Appa_Ganesha___Srihari___அப்பா_அப்பா_கணேசா__Vinayagar_Song(256k).mp3",
    coverUrl: "ganapathhi-4.jpg",
  },
  {
    title: "Avani_Vandhadhu",
    artist: "vinayagar",
    url: "Avani_Vandhadhu(256k).mp3",
    coverUrl: "ganapathi-3.jpg",
  },
  {
    title: "Ganapathiye_Varuvaai",
    artist: "vinayagar",
    url: "Ganapathiye_Varuvaai___Tamil_Devotional_Video_Song___Seerkazhi_S._Govindarajan___Vinayagar_Songs(256k).mp3",
    coverUrl: "ganapathi-1.jpg",
  },
  
  {
    title: "Pallikattu_Sabarimalaikku",
    artist: "vinayagar",
    url: "Pallikattu_Sabarimalaikku___பள்ளிக்கட்டு___HD_Tamil_Devotional_Video___K._Veeramani___Ayyappan_Songs(256k).mp3",
    coverUrl: "ganapathi-5.jpg",
  },
  {
    title: "Samy_Romba_Sirusaiya_Sakthi_Romba_Perumaiya",
    artist: "vinayagar",
    url: "Samy_Romba_Sirusaiya_Sakthi_Romba_Perumaiya____Ayyappan_Song_in_Tamil____@SivanBeatz_47(256k).mp3",
    coverUrl: "ganapathi-2.jpg",
  },
  {
    title: "sokkanathan_petredutha_pillaiyaram_pillaiyar",
    artist: "vinayagar",
    url: "sokkanathan_petredutha_pillaiyaram_pillaiyar_or_vinayagar_special_view_songs.(256k).mp3",
    coverUrl: "ganapathhi-4.jpg",
  },
  {
    title: "Vinayagane_Vinai_Theerpavane",
    artist: "vinayagar",
    url: "Vinayagane_Vinai_Theerpavane_with_Lyrics___Dr._Sirkazhi_S._Govindarajan_Devotional_songs(256k).mp3",
    coverUrl: "ganapathi-3.jpg",
  },
  {
    title: "இருமுடிக்கட்டு_சபரிமலைக்கு",
    artist: "vinayagar",
    url: "இருமுடிக்கட்டு_சபரிமலைக்கு___Irumudikattu_Sabarimalaikku___Sabarimalai_Yathirai_Tamil___AyyappaSongs(256k).mp3",
    coverUrl: "ganapathi-1.jpg",
  },
  
  {
    title: "Ye_Saamy_Varuthu",
    artist: "vinayagar",
    url: "Ye_Saamy_Varuthu_-_HD_Video_Song____ஏ_சாமி_வருது_சாமி_வருது___Udan_Pirappu___Sathyaraj___Ilaiyaraaja(256k).mp3",
    coverUrl: "ganapathi-5.jpg",
  },
  {
    title: "எங்கே_மணக்குது",
    artist: "vinayagar",
    url: "எங்கே_மணக்குது___Enge_Manakkuthu___Sabarimalai_Yathirai_Tamil___AyyappaDevotionalSongsTamil(256k).mp3",
    coverUrl: "ganapathi-2.jpg",
  },
  {
    title: "எல்லாம்_வல்ல_தாயே",
    artist: "vinayagar",
    url: "எல்லாம்_வல்ல_தாயே___முழு_பாடல்_வரிகளுடன்___வீரமணிதாசன்___Ellam_Valla_Thaye_Lyrics_video(256k).mp3",
    coverUrl: "ganapathhi-4.jpg",
  },

  {
    title: "ஓம்_தில்லை_நடராஜனே.",
    artist: "vinayagar",
    url: "ஓம்_தில்லை_நடராஜனே...___Tamil_Cover_Song___Mathichiyam_Bala(256k).mp3",
    coverUrl: "ganapathi-1.jpg",
  },
  
  {
    title: "சரணம்_ஐயப்பா",
    artist: "vinayagar",
    url: "சரணம்_ஐயப்பா_பாடல்_பிஸ்தா_தமிழ்_திரைப்படப்பாடல்கள்__கார்திக்___நக்மா__பிரமிட்_இசை(256k).mp3",
    coverUrl: "ganapathi-5.jpg",
  },
  {
    title: "பள்ளிக்கட்டு_Pallikkattu",
    artist: "vinayagar",
    url: "பள்ளிக்கட்டு___Evergreen_Ayyappa_Devotional_Song___Sung_by_Veeramani_Raju___Pallikkattu(256k).mp3",
    coverUrl: "ganapathi-2.jpg",
  }, 
  {
    title: "பொய்யின்றி_மெய்யோடு",
    artist: "vinayagar",
    url: "பொய்யின்றி_மெய்யோடு_பாடல்_சரணம்_ஐயப்பா_படப்பாடல்கள்__பூபதி_ராதாரவி__பூர்ணிமா__பிரம(256k).mp3",
    coverUrl: "ganapathi-2.jpg",
  }, 

];

let currentSongIndex = 0;
let isPlaying = false;
let userPaused = false;
let isSearchActive = false;
let searchResults = [];
const audio = new Audio();
const trackList = document.getElementById('trackList');
const searchInput = document.getElementById('search');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playPauseButton = document.getElementById('playPause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

// Function to send media control events to MIT App Inventor
function sendMediaControlEvent(event) {
  if (window.AppInventor) {
    window.AppInventor.setWebViewString(`MediaControl:${event}`);
  }
}

// Function to send metadata updates to MIT App Inventor
function sendMetadataUpdate(song) {
  if (window.AppInventor) {
    const metadata = {
      title: song.title,
      artist: song.artist,
      coverUrl: song.coverUrl || "default-cover.jpg",
    };
    window.AppInventor.setWebViewString(`MetadataUpdate:${JSON.stringify(metadata)}`);
  }
}

const loadSong = (index) => {
  const song = SONGS[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.url;
  progress.value = 0;
  currentTimeDisplay.textContent = "0:00";
  durationDisplay.textContent = "0:00";
  updateMediaSession(song);
  cover.src = song.coverUrl || "default-cover.jpg";
  // Try to extract cover image from MP3 metadata
  fetch(song.url)
    .then(response => response.blob())
    .then(blob => {
      jsmediatags.read(blob, {
        onSuccess: function (tag) {
          const picture = tag.tags.picture;
          if (picture) {
            let base64String = "";
            for (let i = 0; i < picture.data.length; i++) {
              base64String += String.fromCharCode(picture.data[i]);
            }
            const base64 = btoa(base64String);
            cover.src = `data:${picture.format};base64,${base64}`;
          } else {
            cover.src = song.coverUrl || "default-cover.jpg"; // Use array cover or fallback
          }
        },
        onError: function (error) {
          console.error("Error reading cover art:", error);
          cover.src = song.coverUrl || "default-cover.jpg"; // Use array cover or fallback
        }
      });
    })
    .catch(error => {
      console.error("Error fetching MP3 file:", error);
      cover.src = song.coverUrl || "default-cover.jpg"; // Use array cover or fallback
    });
};

// Play the current song
const playSong = () => {
  userPaused = false;
  isPlaying = true;
  audio.play().catch(error => {
    console.error("Playback failed:", error);
  });
  playPauseButton.textContent = '⏸';
  updateAppInventorState(`Playing: ${SONGS[currentSongIndex].title}`)
  sendMediaControlEvent('play');
};

// Pause the current song (only when user explicitly pauses)
const pauseSong = () => {
  userPaused = true;
  isPlaying = false;
  audio.pause();
  playPauseButton.textContent = '▶️';
  updateAppInventorState(`Paused: ${SONGS[currentSongIndex].title}`);
  sendMediaControlEvent('pause');
};

// Toggle play/pause
const togglePlayPause = () => {
  isPlaying ? pauseSong() : playSong();
};

// Play the next song
const playNextSong = () => {
  if (isSearchActive && searchResults.length > 0) {
    currentSongIndex = (currentSongIndex + 1) % searchResults.length;
    loadSong(SONGS.indexOf(searchResults[currentSongIndex]));
  } else {
    currentSongIndex = (currentSongIndex + 1) % SONGS.length;
    loadSong(currentSongIndex);
  }
  playSong();
  sendMediaControlEvent('next');
};

// Play the previous song
const playPrevSong = () => {
  if (isSearchActive && searchResults.length > 0) {
    currentSongIndex = (currentSongIndex - 1 + searchResults.length) % searchResults.length;
    loadSong(SONGS.indexOf(searchResults[currentSongIndex]));
  } else {
    currentSongIndex = (currentSongIndex - 1 + SONGS.length) % SONGS.length;
    loadSong(currentSongIndex);
  }
  playSong();
  sendMediaControlEvent('previous');
};

// Update the progress bar and time display
const updateProgress = () => {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100 || 0;
  currentTimeDisplay.textContent = formatTime(currentTime);
  durationDisplay.textContent = formatTime(duration);
};

// Format time for display
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

// Handle seeking through the progress bar
const handleSeek = (e) => {
  const seekTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
};

// Update WebViewString to prevent App Inventor from stopping
updateAppInventorState("Playing: " + SONGS[currentSongIndex].title + " - " + Math.floor(audio.currentTime) + "s");

// Debounce function to limit the rate of execution
const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

// Filter the song list based on the search input
const filterSongs = debounce(() => {
  const query = searchInput.value.toLowerCase();
  searchResults = SONGS.filter((song) => song.title.toLowerCase().includes(query));
  isSearchActive = query.length > 0;
  renderSongList(searchResults);
}, 300);

const renderSongList = (songs) => {
  trackList.innerHTML = ''; // Clear the existing list
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.classList.add('track');

    // Create an image element for the cover
    const img = document.createElement('img');
    img.src = "default-cover.jpg"; // Set default initially
    img.alt = song.title;
    img.classList.add('track-cover'); // Add CSS class for styling

    // Array of random cover images (URLs or Base64 data)
    const defaultCovers = [
      "ganapathhi-4.jpg",
      "ganapathi-1.jpg",
      "ganapathi-2.jpg",
      "ganapathi-3.jpg",
      "ganapathi-5.jpg"
      
    ];

    // Function to get a random cover image
    function getRandomCover() {
      return defaultCovers[Math.floor(Math.random() * defaultCovers.length)];
    }

    // Set a random cover icon immediately
    img.src = getRandomCover();

    // Create a div for track info
    const trackInfo = document.createElement('div');
    trackInfo.classList.add('track-info');

    // Create a div for the title
    const trackTitle = document.createElement('div');
    trackTitle.classList.add('track-title');
    trackTitle.textContent = song.title;
    trackInfo.appendChild(trackTitle);

    li.appendChild(img);
    li.appendChild(trackInfo);

    li.addEventListener('click', () => {
      if (isSearchActive) {
        currentSongIndex = SONGS.indexOf(song);
      } else {
        currentSongIndex = index;
      }
      loadSong(currentSongIndex);
      playSong();
    });

    trackList.appendChild(li);
  });
};

// Function to update media session metadata and send status to App Inventor
const updateMediaSession = (song) => {
  if ('mediaSession' in navigator) {
    // Default to provided coverUrl or a fallback image
    let artworkUrl = song.coverUrl || "default-cover.jpg";

    // Try extracting embedded cover art from MP3 metadata
    fetch(song.url)
      .then(response => response.blob())
      .then(blob => {
        jsmediatags.read(blob, {
          onSuccess: (tag) => {
            const picture = tag.tags.picture;
            if (picture) {
              let base64String = "";
              for (let i = 0; i < picture.data.length; i++) {
                base64String += String.fromCharCode(picture.data[i]);
              }
              artworkUrl = `data:${picture.format};base64,${btoa(base64String)}`;
            }

            // Update media session with extracted or fallback artwork
            navigator.mediaSession.metadata = new MediaMetadata({
              title: song.title,
              artist: song.artist,
              album: song.album || "Unknown Album",
              artwork: [{ src: artworkUrl, sizes: "512x512", type: "image/png" }]
            });

            // Send update to App Inventor
            updateAppInventorWithMediaSessionStatus(`Metadata Updated: ${song.title}`);
          },
          onError: (error) => {
            console.error("Error extracting metadata:", error);

            // Use fallback cover if metadata extraction fails
            navigator.mediaSession.metadata = new MediaMetadata({
              title: song.title,
              artist: song.artist,
              album: song.album || "Unknown Album",
              artwork: [{ src: artworkUrl, sizes: "512x512", type: "image/png" }]
            });

            updateAppInventorWithMediaSessionStatus(`Metadata Updated: ${song.title} (No Cover Found)`);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching MP3 file:", error);

        // Use fallback cover if fetching fails
        navigator.mediaSession.metadata = new MediaMetadata({
          title: song.title,
          artist: song.artist,
          album: song.album || "Unknown Album",
          artwork: [{ src: artworkUrl, sizes: "512x512", type: "image/png" }]
        });

        updateAppInventorWithMediaSessionStatus(`Metadata Updated: ${song.title} (Failed to Fetch)`);
      });
  }
};

  // Notification functions
  function showNotification() {
    console.log("Showing notification...");
    // Add your notification UI logic here
  }

  function hideNotification() {
    console.log("Hiding notification...");
    // Add your notification UI logic here
  }

// Ensure playback continues when app is in the background
document.addEventListener("visibilitychange", () => {
  if (document.hidden && isPlaying) {
    showNotification();
  } else {
    hideNotification();
    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Resume after visibility change failed:", error);
      });
    }
  }
});


// Handle system-triggered pauses (e.g., app backgrounded)
audio.addEventListener('pause', (event) => {
  if (!userPaused && isPlaying) {
    // Automatically resume playback if paused by the system (not user)
    setTimeout(() => {
      audio.play().catch(error => {
        console.error("Auto-resume failed:", error);
      });
    }, 100);
  }
});

// Event listeners for audio and controls
audio.addEventListener('ended', playNextSong);
audio.addEventListener('timeupdate', updateProgress);
searchInput.addEventListener('input', () => {
  if (searchInput.value === '') {
    isSearchActive = false;
    searchResults = [];
    renderSongList(SONGS);
  } else {
    filterSongs();
  }
});

playPauseButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', playNextSong);
prevButton.addEventListener('click', playPrevSong);
progress.addEventListener('input', handleSeek);

// Event listeners for audio and controls
audio.addEventListener('ended', playNextSong);
audio.addEventListener('timeupdate', updateProgress);
searchInput.addEventListener('input', filterSongs);
playPauseButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', playNextSong);
prevButton.addEventListener('click', playPrevSong);
progress.addEventListener('input', handleSeek);

// Initial setup
loadSong(currentSongIndex);
renderSongList(SONGS);
setupMediaSession();

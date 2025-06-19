import React, { useState, useRef, useEffect } from 'react';

function Music() {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const Musicdata = [
    {
      id: 1,
      name: "Motivation Song",
      author: "John Doe",
      file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=100&q=80",
      lerix: "Keep going, never give up!"
    },
    {
      id: 2,
      name: "Focus Track",
      author: "Jane Smith",
      file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      logo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=100&q=80",
      lerix: "Stay focused and win."
    },
    {
      id: 3,
      name: "Chill Vibes",
      author: "DJ Relax",
      file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      logo: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=100&q=80",
      lerix: "Relax and enjoy the moment."
    },
    {
      id: 4,
      name: "Test Audio",
      author: "Test Artist",
      file: "https://file-examples.com/storage/fe6e7e2e7e7e7e7e7e7e7e7e7e7e7e7e/audio/mp3/file_example_MP3_700KB.mp3",
      logo: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=100&q=80",
      lerix: "This is a test audio file."
    },
    {
      id: 5,
      name: "Epic Journey",
      author: "Adventure Band",
      file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      logo: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=100&q=80",
      lerix: "Embark on an epic journey."
    },
    {
      id: 6,
      name: "Morning Energy",
      author: "Sunrise Crew",
      file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      logo: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=100&q=80",
      lerix: "Start your day with energy."
    }
  ]

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = isLooping;
      
      const updateTime = () => {
        if (!isSeeking) {
          setCurrentTime(audio.currentTime);
        }
      };
      
      audio.addEventListener('timeupdate', updateTime);
      return () => audio.removeEventListener('timeupdate', updateTime);
    }
  }, [isLooping, isSeeking]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlay = (id, file) => {
    if (playingIndex === id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (playingIndex !== id) {
        audioRef.current.src = file;
        audioRef.current.load();
      }
      setPlayingIndex(id);
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error('Error playing audio:', error));
    }
  }

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }

  const handlePrev = () => {
    if (playingIndex !== null) {
      const prevIndex = playingIndex > 1 ? playingIndex - 1 : Musicdata.length;
      const prevSong = Musicdata[prevIndex - 1];
      handlePlay(prevIndex, prevSong.file);
    }
  }

  const handleNext = () => {
    if (playingIndex !== null) {
      const nextIndex = playingIndex < Musicdata.length ? playingIndex + 1 : 1;
      const nextSong = Musicdata[nextIndex - 1];
      handlePlay(nextIndex, nextSong.file);
    }
  }

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 10);
    }
  }

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, currentTime + 10);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-gradient-to-br from-green-50 to-blue-100 rounded-3xl shadow-2xl">
      <h2 className="font-bold text-3xl mb-8 text-center text-green-800 tracking-tight drop-shadow">🎵 Motivation Music</h2>
      {/* Horizontal scrollable song list */}
      <div className="flex gap-3 overflow-x-auto pb-3">
        {Musicdata.map((item) => (
          <div
            key={item.id}
            className={`flex-shrink-0 w-44 cursor-pointer rounded-2xl border-2 transition-all duration-300 bg-white p-4 flex flex-col items-center shadow-md
              ${playingIndex === item.id
                ? 'border-green-500 shadow-green-200 shadow-lg scale-105 ring-2 ring-green-300'
                : 'border-zinc-200 hover:scale-105 hover:shadow-lg hover:border-green-300'}`}
            onClick={() => handlePlay(item.id, item.file)}
          >
            <div className="relative">
              <img
                src={item.logo}
                alt={item.name}
                className={`w-28 h-28 rounded-xl object-cover border-2 ${playingIndex === item.id ? 'border-green-400' : 'border-zinc-200'}`}
              />
              {playingIndex === item.id && isPlaying && (
                <span className="absolute top-2 right-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs shadow">Playing</span>
              )}
            </div>
            <div className="font-semibold text-base text-green-900 text-center mt-3">{item.name}</div>
            <div className="text-xs text-gray-500 text-center">{item.author}</div>
            <div className="text-xs text-gray-400 text-center mt-1">{item.lerix}</div>
          </div>
        ))}
      </div>
      {/* Player */}
      {playingIndex !== null && (
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center max-w-md mx-auto">
          <img
            src={Musicdata[playingIndex - 1].logo}
            alt={Musicdata[playingIndex - 1].name}
            className="w-32 h-32 rounded-xl object-cover mb-4 border-4 border-green-200 shadow"
          />
          <div className="font-bold text-xl text-green-900 mb-1">{Musicdata[playingIndex - 1].name}</div>
          <div className="text-sm text-gray-500 mb-4">{Musicdata[playingIndex - 1].author}</div>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={handlePrev} className="p-2 rounded-full bg-green-50 hover:bg-green-200 transition">
              <i className="ri-skip-back-fill text-xl text-green-700"></i>
            </button>
            <button onClick={handleRewind} className="p-2 rounded-full bg-green-50 hover:bg-green-200 transition">
              <i className="ri-rewind-fill text-xl text-green-700"></i>
            </button>
            <button
              onClick={() => handlePlay(playingIndex, Musicdata[playingIndex - 1].file)}
              className="p-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-lg transition"
            >
              <i className={`ri-${isPlaying ? 'pause' : 'play'}-fill text-3xl`}></i>
            </button>
            <button onClick={handleForward} className="p-2 rounded-full bg-green-50 hover:bg-green-200 transition">
              <i className="ri-speed-fill text-xl text-green-700"></i>
            </button>
            <button onClick={handleNext} className="p-2 rounded-full bg-green-50 hover:bg-green-200 transition">
              <i className="ri-skip-forward-fill text-xl text-green-700"></i>
            </button>
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-2 rounded-full border-2 ${isLooping ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-green-700 border-green-300'} hover:bg-blue-100 transition`}
            >
              <i className="ri-repeat-line"></i>
            </button>
          </div>
          <div className="w-full flex items-center gap-3 mb-4">
            <i className={`ri-volume-${volume === 0 ? 'mute' : volume < 0.5 ? 'down' : 'up'}-fill text-xl text-green-700`}></i>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              className="flex-1 accent-green-500 h-2 rounded-lg"
              style={{ maxWidth: 120 }}
            />
            <span className="text-xs text-gray-500 w-8 text-right">{Math.round(volume * 100)}%</span>
          </div>
          <div className="w-full flex items-center gap-2">
            <span className="text-xs text-gray-500" style={{ minWidth: 32 }}>
              {Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)}
            </span>
            <input
              type="range"
              min="0"
              max={audioRef.current?.duration || 0}
              value={currentTime}
              onChange={handleSeek}
              onMouseDown={() => setIsSeeking(true)}
              onMouseUp={() => setIsSeeking(false)}
              className="flex-1 accent-green-500 h-2 rounded-lg"
            />
            <span className="text-xs text-gray-500" style={{ minWidth: 32 }}>
              {audioRef.current?.duration
                ? `${Math.floor(audioRef.current.duration / 60)}:${('0' + Math.floor(audioRef.current.duration % 60)).slice(-2)}`
                : '0:00'}
            </span>
          </div>
        </div>
      )}
      <audio ref={audioRef} />
    </div>
  );
}

export default Music;
// src/utils/songUtils.js

export const favoriteSong = async (song, axios, store) => {
    try {
        const response = await axios.post('/api/favoriteSong', {
        brand: song.brand,
        no: song.no,
        singer: song.singer,
        title: song.title,
        userId: store.getters.getUser.sub,
        composer: song.composer,
        lyricist: song.lyricist,
        releaseDate: song.release
    });
    console.log(response);

    if (response.data.body.liked) {
      alert("즐겨찾기가 추가되었습니다.");
      song.liked = true;
    } else {
    console.log(song);
      alert("즐겨찾기가 삭제되었습니다.");
    }
  } catch (error) {
    console.error('Error occurred while saving:', error);
  }
};

export const searchYoutube = (song) => {
  const searchVal = song.singer + " " + song.title;
  const youtubeLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchVal)}`;
  window.open(youtubeLink, '_blank');
};

// src/utils/songUtils.js
import { showSuccessAlert } from '@/utils/swal';

//export const favoriteSong = async (song, axios, store) => {
export const favoriteSong = async (song, axios) => {
    try {
      const response = await axios.post(process.env.VUE_APP_BACKEND_URL+'/api/favoriteSong', {
        brand: song.brand,
        no: song.no,
        singer: song.singer,
        title: song.title,
        //userId: store.getters.getUser.sub,
        composer: song.composer,
        lyricist: song.lyricist,
        releaseDate: song.release
    });
    console.log(response);

    if (response.data.body.liked) {
      showSuccessAlert("즐겨찾기가 추가되었습니다.");
      song.liked = true;
    } else {
      showSuccessAlert("즐겨찾기가 삭제되었습니다.");
      song.liked = false;
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

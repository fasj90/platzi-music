import platziMusicService from './platzi-music';

const trackService = {};

trackService.search = async function search(q) {
  const type = 'track';

  const res = await platziMusicService.get('/search', {
    params: { q, type },
  });
  return res.data;
};

trackService.getById = async function getById(id) {
  const res = await platziMusicService.get(`/tracks/${id}`);
  return res.data;
};

export default trackService;

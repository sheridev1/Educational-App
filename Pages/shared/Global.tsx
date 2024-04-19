import {create} from 'apisauce';

const api = create({
  baseURL: 'http://192.168.1.107:1337/api',
  headers: {
    'X-API-KEY':
      '749c08be094fa8506fa79c363f20c07dc1aa9a3903e3de8eb6db83e048317b91f066747bf4e6d3e71b58726f8ade8d3243400b3642a3038a33fcaf8d53c96fbcda7bb4f8810466a4ef146165039b82f7d04f1a77d0f59ae31e42ca1697730c38f91f1fbe778737b3de4e5be45e24279793328b48f8633da45ef0b6c27d0a4392',
  },
});

const getSlider = () => api.get('/sliders?populate=*');
const getVideoCourse = () => api.get('/video-courses?populate=*');
const getCourseList = type =>
  api.get(
    '/course-lists?filters[type][$eq]=' +
      type +
      '&populate[Topic][populate][0]=Content&populate[image][populate][0]=image',
  );
const setCourseProgress = data => api.post('/course-progresses', data);
const getCourseProgress=(uid,courseId)=>
api.get('/course-progresses?filters[uid][$eq]='
+uid+'&filters[courseId][$eq]='+courseId)
export default {
  getSlider,
  getVideoCourse,
  getCourseList,
  setCourseProgress,
  getCourseProgress,
};

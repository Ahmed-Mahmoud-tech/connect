import { createSlice } from '@reduxjs/toolkit';

import memberImage from '../../assets/images/member.png';
import adminImage from '../../assets/images/admin.png';
import titleIcon from '../../assets/images/title.png';

const initialState = {
  //   value: 0,
  activeRole: localStorage.getItem('activeRole') || '',
  username: localStorage.getItem('username') || '',
  authenticated: false,
  role: {
    admin: {
      position: 'admin',
      subHeader: {
        image: adminImage,
        titleIcon,
        title: 'Admin',
        description:
          'In continuation to your competent and trusted evaluation of the 3 physical activities and the 2 online activities as a moderator, you are expected to record the scores of the team members according to the points of assessments, performance, KPIs, and the communicated scoring scale. ',
      },
    },
    member: {
      position: 'member',
      action: [
        { text: 'Join QUIZ', link: '/quiz' },
        { text: 'Start Game', link: '/game' },
      ],
      subHeader: {
        image: memberImage,
        // titleIcon,
        title: 'QUIZ Description',
        description:
          'Believing in your mindset and abilities, we are providing you a quiz to assess your knowledge and embark on a new chapter in your career journey. You can collect more points by participating in a bonus game after finishing your quiz! ',
      },
    },
    moderator: {
      position: 'moderator',
      subHeader: {
        titleIcon,
        title: 'Moderator',
        description:
          'In continuation to your competent and trusted evaluation of the 2 physical activities and the 2 online activities as a moderator, you are expected to record the scores of the team members according to the points of assessments, performance, KPIs, and the communicated scoring scale.',
      },
      navItems: {
        itemsData: [],
      },
      apiActivityNumber: 0,
    },
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginResult: (state, action) => {
      state.activeRole = action.payload.activeRole;
      state.username = action.payload.username;
    },
    gameSubHeader: (state) => {
      state.role.member.subHeader.title = 'GAME Description';
      state.role.member.subHeader.description =
        'Collect more bonus points and enjoy the Connect four game! ';
    },
    activityNumber: (state, action) => {
      state.role.moderator.apiActivityNumber = action.payload;
    },

    removeAuth: (state) => {
      state.authenticated = false;
      localStorage.clear();
    },

    addAuth: (state, action) => {
      state.activeRole = action.payload[1];
      state.username = action.payload[0];
      state.authenticated = true;
    },

    authStatus: (state) => {
      state.authenticated = true;
    },

    allActivities: (state, action) => {
      state.role.moderator.navItems.itemsData = action.payload;
    },
  },
});

export const {
  loginResult,
  gameSubHeader,
  activityNumber,
  removeAuth,
  addAuth,
  authStatus,
  allActivities,
} = userSlice.actions;

export default userSlice.reducer;

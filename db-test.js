const User = require('./models/userSchema');
const { Diary } = require('./models/diarySchema');

const { Types } = require('mongoose');
const { formatDate } = require('./functions/functions');

const testUser = new User({
  userInfo: {
    username: 'test',
    password: '12345678',
    email: 'test@test.com',
    firstName: 'Munkhjin',
    lastName: 'Nyamdorj',
    gender: true,
    height: 185,
    dateOfBirth: '1998-11-09',
  },
  goalInfo: {
    currentWeight: 77.9,
    goalWeight: 74,
    weeklyGoal: -0.5,
    activityLevel: 2,
    nutritionGoals: {
      calories: 2000,
      carbohydrates: 150,
      protein: 100,
      fat: (2000 - 100 * 4 - 150 * 4) / 9,
    },
  },
});

const testDiary = new Diary({
  date: formatDate(new Date()),
  user_id: Types.ObjectId('5f607f85a586e00e416f2124'),
  lunch: [
    {
      serving: 2.1,
      food: Types.ObjectId('5f363641127c0f0f3799990a'),
    },
  ],
});

module.exports = {
  testUser,
  testDiary,
};

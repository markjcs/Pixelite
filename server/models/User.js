
const mongoose = require('mongoose');

const { Schema } = mongoose;
const storySchema = new Schema({
  title: { type: String },
  items:
  [{
    imgUri: String,
    description: String,
    place: String,
    gps: {
      longitude: Number,
      latitude: Number,
    },
  }],
});
/*
tems
:
Array(3)
0
:
{imgUri: "https://s3.ap-northeast-2.amazonaws.com/pixelite-s…l7OJ5Nx1-99597719-3561-4CC8-844C-6CC951B6B928.jpg", _id: "59c614232638672158b38ff8"}
1
:
{imgUri: "https://s3.ap-northeast-2.amazonaws.com/pixelite-s…l7OJ5Nx1-34899CFD-8913-4095-B4F5-C84CE479B31B.jpg", _id: "59c614232638672158b38ff7"}
2
:
{imgUri: "https://s3.ap-northeast-2.amazonaws.com/pixelite-s…l7OJ5Nx1-A7761D43-2262-47C2-BDD1-EDEAD49F6683.jpg", _id: "59c614232638672158b38ff6"}
length
:
3
__proto__
:
Array(0)
title
:
"hihihihi"
_id
:
"59c614232638672158b38ff5"
__proto__
:
Object
*/

const userSchema = new Schema({
  uid: String,
  profile: {
    googleId: String,
    email: String,
    familyName: String,
    givenName: String,
    password: String,
  },
  stories: [storySchema],
  friends: {
    follower: [String],
    following: [String],
  },
});

const Story = mongoose.model('story', storySchema);
const User = mongoose.model('user', userSchema);

module.exports.Story = Story;
module.exports.User = User;

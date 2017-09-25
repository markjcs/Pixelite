const passport = require('passport');
const { User, Story } = require('../models/User');
const AWS = require('aws-sdk');


AWS.config.region = 'ap-northeast-2';
AWS.config.loadFromPath('./config/config.json');
const s3 = new AWS.S3();
// console.log('s3', s3);
const params = {
  Bucket: 'pixelite-s3bucket-dev',
  MaxKeys: 2,
};

module.exports = app => {
  // Set up Google auth routes
  app.get(
    '/auth/google',
    passport.authenticate('google', { // 'google' -> internal identifier of GoogleStrategy
      scope: ['profile', 'email'],
    }),
  );
  // get accessToken
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout/', (req, res) => {
    req.logout(); // logout() attatched by passport, kills user's cookie
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // user attatched by passport
  });
  // app.get('/usersDB', (req, res) => {
  //   User.find({})
  //     .exec((err, users) => {
  //       if (err) {
  //         res.send('error has occured');
  //       } else {
  //         console.log(users);
  //         res.send(users);
  //       }
  //     });
  // });


  app.post('/updateUserProfile', (req, res) => {
    User.find({ uid: req.body.user.uid })
      .then(doc => {
        if (doc.length === 0) {
          const newUser = new User({ uid: req.body.user.uid });
          newUser.save()
          .catch(err => console.log(err));
        } else {
          console.log("doc: ")
          res.send(JSON.stringify(doc[0]));
        }
      });
  });

  // post story
  app.post('/createNewStory', (req, res) => {
    // console.log('body: ', req.body);
    // console.log(req.body.story.items, req.body.story.title);
    const newStory = Story({
      title: req.body.story.title,
      items: req.body.story.items
    });
    // console.log('story: ', newStory);
    User.findOne({uid: req.body.user.uid})
      .then(doc => {
        doc.stories.push(newStory);
        doc.save()
        .then( result => {
          res.send(doc);
        });
      })
    // User.;
    // User.save({});
    // User.findOneAndUpdate(
    //   { uid: req.body.user.uid },
    //   { $push: { stories: newStory } });
  });
};

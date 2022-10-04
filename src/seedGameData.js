const GAMEDATA = {
  ps2: {
    src: require('assets/gameboards/ps2.jpg'),
    characters: [
      {name: 'Tommy Vercetti', src: require('assets/characters/tommyvercetti.png')},
      {name: 'Ratchet', src: require('assets/characters/ratchet.webp')},
      {name: 'Jak and Daxter', src: require('assets/characters/jakanddaxter.webp')},
    ]
  },
  ps3: {
    src: require('assets/gameboards/ps3.jpg'),
    characters: [ //NEED TO REPLACE WITH ACTUAL CHARACTERS
      {name: 'Kratos', src: require('assets/characters/kratos.webp')},
      {name: 'Old Snake', src: require('assets/characters/oldsnake.png')},
      {name: 'Cole MacGrath', src: require('assets/characters/colemacgrath.webp')},
    ]
  },
  ps4: {
    src: require('assets/gameboards/ps4.jpg'),
    characters: [ //NEED TO REPLACE WITH ACTUAL CHARACTERS
      {name: 'Big Boss', src: require('assets/characters/bigboss.png')},
      {name: 'Arthur Morgan', src: require('assets/characters/arthurmorgan.png')},
      {name: 'Ryu', src: require('assets/characters/ryu.png')},
    ]
  },
};

export default GAMEDATA;

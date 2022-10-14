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

const SAMPLETIMES = [
  /*
  1000: ['John', 'Jack'],
  4970: ['Jill'],
  5130: ['Moe'],
  5680: ['Curly'],
  6420: ['Larry', 'Tom', 'Dick', 'Harry'],
  7050: ['Will'],
  8400: ['Bill'],
  9700: ['Phil']
  */
  ['1000', 'John'],
  ['1000', 'Jack'],
  ['4970', 'Player'],
  ['5130', 'Player'],
  ['5680', 'Player'],
  ['6420', 'Joe Succ'],
  ['6420', 'Joe Ducc'],
  ['6420', 'Hong Kong Fukface'],
  ['6420', 'Player'],
  ['7050', 'Slick Dick'],
  ['8400', 'Player'],
  ['9700', 'Hong Kong Fukface']
]


export {GAMEDATA, SAMPLETIMES}


//export default GAMEDATA;

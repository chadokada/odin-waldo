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
    characters: [ 
      {name: 'Kratos', src: require('assets/characters/kratos.webp')},
      {name: 'Old Snake', src: require('assets/characters/oldsnake.png')},
      {name: 'Cole MacGrath', src: require('assets/characters/colemacgrath.webp')},
    ]
  },
  ps4: {
    src: require('assets/gameboards/ps4.jpg'),
    characters: [
      {name: 'Big Boss', src: require('assets/characters/bigboss.png')},
      {name: 'Arthur Morgan', src: require('assets/characters/arthurmorgan.png')},
      {name: 'Ryu', src: require('assets/characters/ryu.png')},
    ]
  },
};

const SAMPLETIMES = {
  'ps2' : [
    ['1001', "Joe's Step Dad"],
    ['3210', 'Skeet Davison'],
    ['6010', 'Big Joe Stevenson'],
    ['6400', 'Slimey Dan'],
    ['6830', 'Big Gay Al'],
    ['7440', 'Boltok The Flautist'],
    ['7620', 'Buck Nasty'],
    ['7650', 'fat fuck'],
    ['8000', 'Bill Blurr'],
    ['9050', 'Uncle Ken'],
    ['16270', 'Slimey Dan']
  ],
  'ps3' : [
    ['1000', 'Jill'],
    ['1000', 'Joe'],
    ['4970', 'Playa'],
    ['5130', 'Player'],
    ['5680', 'Playo'],
    ['6420', 'Loe Succ'],
    ['6420', 'Loe Ducc'],
    ['6420', 'Wong Kong Fookee'],
    ['6420', 'Player'],
    ['7050', 'Slick Dick'],
    ['8400', 'Player'],
    ['9700', 'Dick Dasterdly']
  ],
  'ps4' : [
    ['4210', 'Menashe'],
    ['8773', 'Bébinn'],
    ['7751', 'Meena'],
    ['2976', 'Brigid'],
    ['1173', 'Darya'],
    ['1959', 'Wine'],
    ['9672', 'Ailill'],
    ['7605', 'Emma'],
    ['3756', 'Sam'],
    ['1041', 'Matt']
  ]  
}





export {GAMEDATA, SAMPLETIMES};
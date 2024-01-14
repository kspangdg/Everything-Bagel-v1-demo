const menu = new EB_Menu(1024, 576, "public/assets/images/menu_background.png", 'EverythingBagel.js', 'EB_core/assets/img/bagel.png'); // Config Main Menu
const game = new EB_Config(document.createElement("canvas"), 1024, 576); // Config Canvas
const clock = new EB_Clock(20); // Start clock
const physics = new EB_Physics(8); // Init physics
const input = new EB_Input([ "ArrowLeft", "ArrowRight", "ArrowUp", "x"], false); // Init input
const music = new EB_Audio('public/assets/audio/EB_soundtrack.mp3', 0.9, true); // Music
const attack = new EB_Audio('public/assets/audio/attack.mp3' , 0.4, false); // Attack sound
const eattack = new EB_Audio('public/assets/audio/eattack.mp3', 0.9, false); // Enemy attack sound
const jump = new EB_Audio('public/assets/audio/jump.mp3', 0.4, false); // Jump sound

const background = new EB_Background({
	position: {
		x: 0,
		y: 0
	},
	image_src: 'public/assets/images/background.png',
	loop: true,
	parallax: 0.25
});
const midground = new EB_Background({
	position: {
		x: 0,
		y: 0
	},
	image_src: 'public/assets/images/midground.png',
	loop: true,
	parallax: 0.5
});
const forground = new EB_Background({
	position: {
		x: -600,
		y: 0
	},
	image_src: 'public/assets/images/forground.png',
	loop: false,
	parallax: 1
});
const gameover = new EB_Background({
	position: {
		x: 0,
		y: 0
	},
	image_src: 'public/assets/images/gameover.png',
	loop: false,
});
const victory = new EB_Background({
	position: {
		x: 0,
		y: 0
	},
	image_src: 'public/assets/images/youwon.png',
	loop: false,
});

const player = new EB_Player({
	position: { x: 350, y: 295},
	size: {w: 50, h: 150 },
	velocity: { x: 0, y: 0 },
	image_src: 'public/assets/images/idle_right.png',
	frames_max: 8,
	collision_box: {
		active: true,
		offset: {x: 140, y: 125},
		width: 80,
		height: 100
	},
	hit_box: {
		offset: {x: 15, y: 130},
		width: 120,
		height: 90
	},
	sprites: {
		idle_right: {
			image_src: 'public/assets/images/idle_right.png',
			frames_max: 8
		},
		run_right: {
			image_src: 'public/assets/images/run_right.png',
			frames_max: 8
		},
		jump_right: {
			image_src: 'public/assets/images/jump_right.png',
			frames_max: 2
		},
		fall_right: {
			image_src: 'public/assets/images/fall_right.png',
			frames_max: 2
		},
		attack_right: {
			image_src: 'public/assets/images/attack_right.png',
			frames_max: 6
		},
		dead_right: {
			image_src: 'public/assets/images/dead_right.png',
			frames_max: 6
		}
	}
})

const enemy = new EB_Player({
	position: { x: game.width + 300, y: 300 },
	size: {w: 50, h: 150 },
	velocity: { x: 0, y: 0 },
	image_src: 'public/assets/images/eidle_right.png',
	frames_max: 8,
	collision_box: {
		active: true,
		offset: {x: 120, y: 120},
		width: 115,
		height: 95
	},
	sprites: {
		idle_right: {
			image_src: 'public/assets/images/eidle_right.png',
			frames_max: 8
		},
		run_right: {
			image_src: 'public/assets/images/erun_right.png',
			frames_max: 8
		},
		jump_right: {
			image_src: 'public/assets/images/jump_right.png',
			frames_max: 2
		},
		fall_right: {
			image_src: 'public/assets/images/fall_right.png',
			frames_max: 2
		},
		attack_right: {
			image_src: 'public/assets/images/eattack_right.png',
			frames_max: 6
		},
		dead_right: {
			image_src: 'public/assets/images/edead_right.png',
			frames_max: 6
		}
	}
})

// Main Menu
menu.init();

// Toggle mute
function mute() {
	let audio_button = document.getElementById('audio_btn');
	let audio_img = audio_button.childNodes[0];
	if (game.mute) {
		game.mute = false
		audio_img.src = 'public/assets/images/audio_on.png';
	} else {
		game.mute = true;
		audio_img.src = 'public/assets/images/audio_off.png';
	}
}

// Start the game
function init() {
	menu.hide();
	clock.start();
	game.start();
	music.play();
}
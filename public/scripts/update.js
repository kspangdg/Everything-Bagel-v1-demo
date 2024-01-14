function timer() {
	clock.seconds++;
}
function update() {
    game.clear();
    clock.update();
    background.update();
    midground.update();
    forground.update();
    enemy.update();
    player.update();
    
    // Player
    if (player.health > 0) {
        if (!input.keys.ArrowLeft.pressed && !input.keys.ArrowRight.pressed && !player.jump && !player.fall && !player.attack) {
            player.switch_sprite('idle_right');
        }
        // Run
        if (input.keys.ArrowLeft.pressed && !player.attack && !player.dead && !enemy.dead) {
            if (player.collision_box.left >= 350) {
                player.velocity.x = physics.excelerate(player, 8, 0.5).left
            } else { 
                player.velocity.x = 0
                if (forground.position.x < -240) {
                    background.position_x(8);
                    midground.position_x(8);
                    forground.position_x(8);
                    enemy.position.x += 8;
                }
            }
            player.flip = true;
            player.switch_sprite('run_right');
        } else if (input.keys.ArrowRight.pressed && !player.attack && !player.dead && !enemy.dead) {
            if (player.collision_box.right <= game.canvas.width - 350) {
                player.velocity.x = physics.excelerate(player, 8, 0.5).right
            } else {
                player.velocity.x = 0
                if (forground.position.x > -forground.image.width + 1270) {
                    background.position_x(-8);
                    midground.position_x(-8);
                    forground.position_x(-8);
                    enemy.position.x -= 8;
                }
            }
            player.flip = false;
            player.switch_sprite('run_right');
        } else {
            player.velocity.x = 0;
        }
        // Jump
        if (input.keys.ArrowUp.pressed && !player.jump && !player.fall && !player.attack && !player.dead && !enemy.dead) {
            player.jump = true;
            player.jump_timer = 0;
        }
        if (player.jump && player.position.y < 150) {
            player.jump = false;
            player.fall = true;
            player.jump_timer = 0;
        }
        if (player.fall && player.collision_box.bottom >= 525) {
            player.fall = false;
        }
        if (player.jump) {
            player.jump_timer++;
            player.velocity.y -= 5 + (player.jump_timer / 5);
            player.switch_sprite('jump_right');
            jump.play(true);
        } else if (player.fall) {
            player.jump_timer++;
            player.velocity.y += 5 - (player.jump_timer / 5);
            player.switch_sprite('fall_right');
            jump.pause(true);
        } else {
            player.velocity.y = 0;
            player.position.y = 295;
        }
        // Attack
        if (input.keys.x.pressed && !player.jump && !player.fall && !player.dead && !enemy.dead && !player.attack) {
            player.attack = true;
            player.frames_elapsed = 0;
            clock.timer_start('player_attack',5);
            clock.timer_start('player_attack_sound', 1);
        }
        if (player.attack) {
            player.switch_sprite('attack_right');
            if (clock.timer_end('player_attack_sound')) {
                attack.play();
                player.hit_box.active = true;
            }
            if (player.hit_box.active && player.hit_box.right > enemy.collision_box.left && player.hit_box.left < enemy.collision_box.right) {
                if (enemy.health > 0 && !enemy.hit) {
                    enemy.health -= 10;
                    enemy.hit = true;
                }
            }
            if (clock.timer_end('player_attack')) {
                player.attack = false;
                player.hit_box.active = false;
                attack.pause(true);
                if (enemy.hit) {
                    enemy.hit = false;
                }
            }
        }
    } else {
        player.switch_sprite('dead_right');
        player.velocity.x = 0;
        if (!player.dead) {
            player.dead = true;
            player.frames_elapsed = 0;
        }
        if (player.dead && player.frames_elapsed > 25) {
            player.pause_animate = true;
            music.pause(false);
            gameover.update();
        }
    }

    // Enemy
    // Run
    if (clock.seconds > 2 && enemy.health > 0 && !player.dead) {
        if (!physics.collision(enemy, player).any && !player.hit) {
            if (player.position.x < enemy.position.x) { 
                enemy.velocity.x = physics.excelerate(enemy, 6, 0.5).left
                enemy.flip = true;
                enemy.switch_sprite('run_right');
            } else if (player.position.x > enemy.position.x) {
                enemy.velocity.x = physics.excelerate(enemy, 6, 0.5).right
                enemy.flip = false;
                enemy.switch_sprite('run_right');                
            } else {
                enemy.velocity.x = 0;
            }
        } else {
            enemy.velocity.x = 0;
            if (player.jump || player.fall && !player.hit) {
                enemy.switch_sprite('idle_right');
            } else {
                enemy.switch_sprite('attack_right');
                if (player.health > 0 && !player.hit) {
                    player.health -= 10;
                    player.hit = true;
                    eattack.play();
                    clock.timer_start('enemy_attack',5);
                }
            }
        }
    }
    if (player.hit && clock.timer_end('enemy_attack')) {
        player.hit = false;
        eattack.pause(true);
    }
    if (enemy.health <= 0) {
        enemy.switch_sprite('dead_right');
        enemy.velocity.x = 0;
        if (!enemy.dead) {
            enemy.dead = true;
            enemy.frames_elapsed = 0;
        }
        if (enemy.dead && enemy.frames_elapsed > 25) {
            enemy.pause_animate = true;
            music.pause(false);
            victory.update();
        }
    }
}

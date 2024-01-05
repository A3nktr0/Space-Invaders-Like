export const checkCollisions = (game, gameState, player, enemies, bullets) => {
    const playerHitBox = {
        x: player.x,
        y: player.y,
        width: player.image.width,
        height: player.image.height,
    };

    const enemyHitBoxes = enemies.enemies.map(enemy => ({
        x: enemy.x,
        y: enemy.y,
        width: enemy.image.width,
        height: enemy.image.height,
    }));

    const bulletHitBoxes = bullets.map(bullet => ({
        x: bullet.x,
        y: bullet.y,
        width: bullet.width,
        height: bullet.height,
    }));



    const handleBulletEnemyCollision = () => {
        let bulletIndex = -1;
        let enemyIndex = enemyHitBoxes.findIndex((enemyHitBox) => {
            bulletIndex = bulletHitBoxes.findIndex(bulletHitBox => isCollision(bulletHitBox, enemyHitBox));
            return bulletIndex !== -1;
        });

        if (bulletIndex !== -1 && enemyIndex !== -1) {
            gameState.score += 10;
            game.soundManager.playSound("enemy-death");
            bullets.splice(bulletIndex, 1);
            enemies.enemies.splice(enemyIndex, 1);
        }
    };

    const handleEnemyBulletPlayerCollision = () => {
        let enemiesBulletIndex = -1;
        let enemiesIndex = enemies.enemies.findIndex((enemy) => {
            enemiesBulletIndex = enemy.bullets.findIndex((bullet) => isCollision({ 
                x: bullet.x,
                y: bullet.y,
                width: bullet.width,
                height: bullet.height
            }, playerHitBox));
            return enemiesBulletIndex !== -1;
        });

        if (enemiesBulletIndex !== -1 && enemiesIndex !== -1) {
            game.soundManager.playSound("player-hit");
            gameState.lives--;
            if (gameState.lives === 0) {
                game.stop();
                return;
            }
            enemies.enemies[enemiesIndex].bullets.splice(enemiesBulletIndex, 1);
        }
    };

    const handlePlayerEnemyCollision = () => {
        if (enemyHitBoxes.some(enemyHitBox => isCollision(playerHitBox, enemyHitBox))) {
            game.stop();
        }
    };

    handleBulletEnemyCollision();
    handleEnemyBulletPlayerCollision();
    handlePlayerEnemyCollision();
};

const isCollision = (hitBox1, hitBox2) => {
    const xCollision = hitBox1.x < hitBox2.x + hitBox2.width && hitBox1.x + hitBox1.width > hitBox2.x;
    const yCollision = hitBox1.y < hitBox2.y + hitBox2.height && hitBox1.y + hitBox1.height > hitBox2.y;
    return xCollision && yCollision;
};

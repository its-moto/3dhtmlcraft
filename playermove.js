// プレイヤーの動き
function movePlayer() {
    if (keysPressed['r']) {
        player.position.set(3, playerHeight / 2 + 20, 3); // 地面の上に配置（Y座標）
        return;
    }
    const direction = new THREE.Vector3();
    const previousPosition = player.position.clone(); // プレイヤーの現在の位置を保存

    // プレイヤーの移動
    if (keysPressed['w'] && !keysPressed['s']) {
        direction.z = -1; // 前進
    }
    if (keysPressed['s'] && !keysPressed['w']) {
        direction.z = 1; // 後退
    }
    if (keysPressed['a'] && !keysPressed['d']) {
        direction.x = -1; // 左移動
    }
    if (keysPressed['d'] && !keysPressed['a']) {
        direction.x = 1; // 右移動
    }

    // プレイヤーの移動方向をカメラの向きに合わせる
    direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw); // Y軸で回転を適用

    // プレイヤーを移動して、衝突判定
    const normalizedDirection = direction.clone().normalize(); // 移動ベクトルを正規化

    direction.y = 1; // 右移動
    const nextPosition = player.position.clone().addScaledVector(normalizedDirection, moveSpeed); // 次の位置を計算

    // 一旦移動
    player.position.copy(nextPosition);

    player.position.y += 0.05;

    // 衝突判定（移動後にチェック）
    if (checkhit()) {
        // 衝突があった場合、Z方向とX方向を個別に戻して滑るような挙動を作る
        player.position.copy(previousPosition); // まず位置を元に戻す

        // X方向のみ移動して、衝突チェック
        player.position.x += normalizedDirection.x * moveSpeed;
        player.position.y += 0.05;
        if (checkhit()) {
            player.position.x = previousPosition.x; // 衝突した場合はXを元に戻す
        }

        // Z方向のみ移動して、衝突チェック
        player.position.z += normalizedDirection.z * moveSpeed;
        if (checkhit()) {
            player.position.z = previousPosition.z; // 衝突した場合はZを元に戻す
        }
    }

    // プレイヤーのY位置を元に戻す
    player.position.y -= 0.05;

    // スペースキー: ジャンプ
    if (keysPressed[' '] && isGrounded) {
        velocityY = jumpForce; // ジャンプ力を設定
        isGrounded = false; // 地面から離れたことを示す
    }

    // 重力を適用
    if (!isGrounded) {
        if (checkhit()) {
            velocityY = 0;
        } else {
            velocityY += gravity; // 重力を加算
        }
        player.position.y += velocityY; // Y方向の位置を更新
    }

    
    // 地面との当たり判定
    player.position.y -= 0.1;
    if (checkhit()) {
        while (checkhit()) {
            if (!checkhit()) {
                player.position.y -= 0.02;//頭ぶつける判定
            }
            player.position.y += 0.01;
            isGrounded = true;
            velocityY = 0; // Y方向の速度をリセット
        }
        player.position.y -= 0.1;
    } else {
        isGrounded = false; // 衝突がなければ空中にいることを示す
    }
    player.position.y += 0.1;

    if (keysPressed['f'] && !fhold ) {
        viewtype ++;
        fhold = true;
        if (viewtype == 3){
            viewtype= 1
        }
    } if (!keysPressed['f']) {
        fhold = false;
    }
    
    // カメラの位置をプレイヤーに追従させる
    camera.position.copy(player.position);
    if (viewtype == 1) {
        camera.position.y += playerHeight - 1.1; // プレイヤーの頭の上に配置
    } else if (viewtype == 2) {
        const distance = 5; // プレイヤーからカメラまでの距離
        const cameraX = player.position.x + distance * Math.sin(yaw) * Math.cos(-pitch);
        const cameraY = player.position.y + distance * Math.sin(-pitch) + playerHeight - 1.1;
        const cameraZ = player.position.z + distance * Math.cos(yaw) * Math.cos(-pitch);

        camera.position.set(cameraX, cameraY, cameraZ);
        camera.lookAt(player.position); // カメラがプレイヤーを向くように設定
    }
}
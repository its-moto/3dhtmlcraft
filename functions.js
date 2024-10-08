
// 照明を設定する関数
function addLighting(scene) {
    // 環境光を追加
    const ambientLight = new THREE.AmbientLight(0x1b3540, 2); // 環境光
    scene.add(ambientLight);

    // ポイントライトを追加
    const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
    DirectionalLight.position.set(10,10,10);
    DirectionalLight.castShadow = true;
    DirectionalLight.shadow.mapSize.set(256, 256);
    scene.add(DirectionalLight);
    
}

function checkhit() {
    // プレイヤーの境界ボックスを常に更新
    playerBox.setFromObject(player);

    // プレイヤーとブロックの衝突判定
    for (const block of blocks) {
        const blockBox = new THREE.Box3().setFromObject(block);
        if (playerBox.intersectsBox(blockBox)) {
            return true;
        }
    }
    return false
}

function isBlockVisible(block, allBlocks) {
    // 各方向に隣接するブロックがあるかどうかを確認
    const adjacentOffsets = [
        { x: 1, y: 0, z: 0 }, // 右
        { x: -1, y: 0, z: 0 }, // 左
        { x: 0, y: 1, z: 0 }, // 上
        { x: 0, y: -1, z: 0 }, // 下
        { x: 0, y: 0, z: 1 }, // 前
        { x: 0, y: 0, z: -1 } // 後
    ];

    for (const offset of adjacentOffsets) {
        const neighbor = allBlocks.find(b =>
            b.position.x === block.position.x + offset.x &&
            b.position.y === block.position.y + offset.y &&
            b.position.z === block.position.z + offset.z
        );

        // 隣接するブロックがない場合は描画対象
        if (!neighbor) {
            return true;
        }
    }

    // 全ての方向にブロックが隣接している場合、描画対象外
    return false;
}

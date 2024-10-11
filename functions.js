
// 照明を設定する関数
function addLighting(scene) {
    // 環境光を追加
    const ambientLight = new THREE.AmbientLight(0x1b3540, 2); // 環境光
    scene.add(ambientLight);

    // ポイントライトを追加
    const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
    DirectionalLight.position.set(10,10,10);
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
        if (!neighbor || block.position.y ==0   ) {
            return true;
        }
    }

    // 全ての方向にブロックが隣接している場合、描画対象外
    return false;
}

async function removeInvisibleBlocks(allBlocks) {
    const blocksToRemove = []; // 削除するブロックのリスト

    for (let block of allBlocks) {
        if (!isBlockVisible(block, allBlocks)) {
            blocksToRemove.push(block); // 非表示のブロックをリストに追加
        }
    }

    // 一度にブロックを削除
    for (let block of blocksToRemove) {
        scene.remove(block); // シーンから削除
        allBlocks.splice(allBlocks.indexOf(block), 1); // 配列から削除
        block.geometry.dispose(); // メモリを解放
        block.material.dispose(); // メモリを解放
    }
}


async function manageChunks() {
    const playerChunkX = Math.floor(player.position.x / chunkSize);
    const playerChunkZ = Math.floor(player.position.z / chunkSize);
    let newgened = false;

    // プレイヤーの周囲のチャンクを計算
    for (let x = playerChunkX - renderDistance; x <= playerChunkX + renderDistance; x++) {
        for (let z = playerChunkZ - renderDistance; z <= playerChunkZ + renderDistance; z++) {
            const chunkKey = `${x},${z}`;

            if (!loadedChunks[chunkKey]) {
                // チャンクが読み込まれていない場合、新しく生成
                await generateTerrain(x * chunkSize, z * chunkSize); // 非同期生成
                loadedChunks[chunkKey] = true;
                newgened = true;
            }
        }
    }

    // 古いチャンクを削除する
    for (let chunkKey in loadedChunks) {
        const [chunkX, chunkZ] = chunkKey.split(',').map(Number);
        if (Math.abs(chunkX - playerChunkX) > renderDistance || Math.abs(chunkZ - playerChunkZ) > renderDistance) {
            // プレイヤーから離れているチャンクを削除する
            await hideChunk(chunkX, chunkZ);  // 非同期でチャンクを非表示
            delete loadedChunks[chunkKey]; // loadedChunks からも削除
        }
    }
    
    if (newgened) {
        await removeInvisibleBlocks(blocks); // 非同期で見えないブロックを削除
    }
}


function hideChunk(chunkX, chunkZ) {
    // チャンク内のブロックを削除する
    for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i];
        if (Math.floor(block.position.x / chunkSize) === chunkX &&
            Math.floor(block.position.z / chunkSize) === chunkZ) {
            scene.remove(block); // シーンから削除
            blocks.splice(i, 1); // 配列から削除
            block.geometry.dispose(); // メモリを解放
            block.material.dispose(); // メモリを解放
        }
    }
}

function colorRandom({rgbtype,allmin=0x00,allmax=0xff, redmin = 0x00, redmax = 0xff, gremin = 0x00, gremax = 0xff, blumin = 0x00, blumax = 0xff}) {
    let randomRed = 0x00;
    let randomGreen = 0x00;
    let randomBlue = 0x00;
    let randomAll = 0x00;

    if (rgbtype === 'r') {
        randomRed = Math.floor(Math.random() * (redmax - redmin + 1)) + redmin;
    } else if (rgbtype === 'g') {
        randomGreen = Math.floor(Math.random() * (gremax - gremin + 1)) + gremin;
    } else if (rgbtype === 'b') {
        randomBlue = Math.floor(Math.random() * (blumax - blumin + 1)) + blumin;
    } else if (rgbtype === 'rg') {
        randomRed = Math.floor(Math.random() * (redmax - redmin + 1)) + redmin;
        randomGreen = Math.floor(Math.random() * (gremax - gremin + 1)) + gremin;
    } else if (rgbtype === 'rb') {
        randomRed = Math.floor(Math.random() * (redmax - redmin + 1)) + redmin;
        randomBlue = Math.floor(Math.random() * (blumax - blumin + 1)) + blumin;
    } else if (rgbtype === 'gb') {
        randomGreen = Math.floor(Math.random() * (gremax - gremin + 1)) + gremin;
        randomBlue = Math.floor(Math.random() * (blumax - blumin + 1)) + blumin;
    } else if (rgbtype === 'rgb') {
        randomAll = Math.floor(Math.random() * (allmax - allmin + 1)) + allmin;
        randomRed = randomAll;
        randomGreen = randomAll;
        randomBlue = randomAll;
    }

    return (randomRed << 16) | (randomGreen << 8) | randomBlue; // 0x00nn00 の形式
}

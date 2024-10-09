

function worldgen(playerX, playerZ) {
    // チャンクの範囲を計算
    const startChunkX = Math.floor(playerX / chunkSize) - renderDistance;
    const startChunkZ = Math.floor(playerZ / chunkSize) - renderDistance;
    const endChunkX = Math.floor(playerX / chunkSize) + renderDistance;
    const endChunkZ = Math.floor(playerZ / chunkSize) + renderDistance;

    for (let x = startChunkX; x <= endChunkX; x++) {
        for (let z = startChunkZ; z <= endChunkZ; z++) {
            // チャンクの座標を生成
            generateTerrain(x * chunkSize, z * chunkSize );
        }
    }
}

function generateTerrain(offsetX, offsetZ, sprea = 0.1, high = 3) {
    for (let x = 0; x < chunkSize; x++) {
        for (let z = 0; z < chunkSize; z++) {
            const height = Math.floor(simplex.noise2D((offsetX + x) * sprea, (offsetZ + z) * sprea) * high + high+15);

            for (let y = 0; y <= height; y++) {
                // チーズ洞窟用のノイズ（大きな空洞を生成）
                //const cheeseNoise = simplex.noise3D((offsetX + x) * 0.1, y * 0.1, (offsetZ + z) * 0.1);
                //if (cheeseNoise > -0.1 && cheeseNoise < 0.1) {
                //    continue; // この範囲は大きな空洞にする
                //}

                // スパゲッティ洞窟用のノイズ（細長いトンネル）
                const spaghettiNoise = simplex.noise3D((offsetX + x) * 0.015, y * 0.05, (offsetZ + z) * 0.015);
                if (spaghettiNoise > -0.13 && spaghettiNoise < 0.13) {
                    continue; // 細長いトンネルを作る
                }

                //ノイズの柱（洞窟内に岩の柱を作る）
                if (y % 10 === 0 && Math.random() < 0.1) {
                    createBlock(offsetX + x, y, offsetZ + z, blockids[3].color()); // 柱の色
                }

                // 通常の地形生成
                if (y == height) {
                    createBlock(offsetX + x, y, offsetZ + z, blockids[2].color()); // color() を呼び出す
                } else if (y >= height-4) {
                    createBlock(offsetX + x, y, offsetZ + z, blockids[1].color); // 他のブロックも同様
                } else {
                    createBlock(offsetX + x, y, offsetZ + z, blockids[3].color()); // 他のブロックも同様
                }
            }
        }
    }
}


function createBlock(bx, by, bz, bcolor = 0x00ff00,blockid = 0) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: bcolor }); // 緑のブロック
    const block = new THREE.Mesh(geometry, material);
    block.position.set(bx, by, bz);
    scene.add(block);
    blocks.push(block); // ブロックを配列に追加
    return block;
}

async function worldgen(playerX, playerZ) {
    // チャンクの範囲を計算
    const startChunkX = Math.floor(playerX / chunkSize) - renderDistance;
    const startChunkZ = Math.floor(playerZ / chunkSize) - renderDistance;
    const endChunkX = Math.floor(playerX / chunkSize) + renderDistance;
    const endChunkZ = Math.floor(playerZ / chunkSize) + renderDistance;

    // 並列でチャンクを生成するためにPromise配列を作成
    const terrainPromises = [];

    for (let x = startChunkX; x <= endChunkX; x++) {
        for (let z = startChunkZ; z <= endChunkZ; z++) {
            // 各チャンク生成を非同期に処理
            terrainPromises.push(generateTerrain(x * chunkSize, z * chunkSize));
        }
    }

    // すべてのチャンクが生成されるまで待つ
    await Promise.all(terrainPromises);
}


async function generateTerrain(offsetX, offsetZ, spread = 0.04, heightScale = 4) {
    for (let x = 0; x < chunkSize; x++) {
        for (let z = 0; z < chunkSize; z++) {
            const height = Math.floor(simplex.noise2D((offsetX + x) * spread, (offsetZ + z) * spread) * heightScale + heightScale + 4 + simplex.noise2D((offsetX + x) * spread/2, (offsetZ + z) * spread/2) * heightScale + heightScale+4);
            
            for (let y = 0; y <= height; y++) {
                if (y == 0) {
                    createBlock(offsetX + x, y, offsetZ + z, 8); // 岩盤生成
                    continue;
                }
                // チーズ洞窟用のノイズ（大きな空洞を生成）
                //const cheeseNoise = noise((offsetX + x) * 0.005, y * 0.01, (offsetZ + z) * 0.004);
                //if (cheeseNoise > -0.2 && cheeseNoise < 0.2) {
                //    continue; // この範囲は大きな空洞にする
                //}

                // スパゲッティ洞窟用のノイズ（細長いトンネル）
                //const spaghettiNoise = simplex.noise3D((offsetX + x) * 0.015, y * 0.03, (offsetZ + z) * 0.015);
                //if (spaghettiNoise > -0.13 && spaghettiNoise < 0.13) {
                //    continue; // 細長いトンネルを作る
                //}

                // スパゲッティ洞窟用のノイズ（細長いトンネル）
                const caveNoise = noise((offsetX + x) * 0.13, y * 0.13, (offsetZ + z) * 0.13);
                if ( caveNoise <0.3 ) {
                    continue; // 細長いトンネルを作る
                }

                // ノイズの柱（洞窟内に岩の柱を作る）
                //if (y % 10 === 0 && Math.random() < 0.1) {
                //    createBlock(offsetX + x, y, offsetZ + z, blockids[4].color); // 柱の色
                //}

                // 通常の地形生成
                if (y == height) {
                    createBlock(offsetX + x, y, offsetZ + z, 2); // 頂上のブロック
                    if ((offsetX + x )%10 == 0 && (offsetZ + z )%10 == 0 ){
                        //genTree(0,offsetX + x,y,offsetZ + z);
                    }
                } else if (y >= height - 4) {
                    createBlock(offsetX + x, y, offsetZ + z, 1); // 上部の層
                } else {
                    createBlock(offsetX + x, y, offsetZ + z, 3); // 地下の層
                }
            }
        }
    }
}


function createBlock(bx, by, bz,blockid = 0) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: blockids[blockid].color() }); // 緑のブロック
    const block = new THREE.Mesh(geometry, material);
    block.position.set(bx, by, bz);
    scene.add(block);
    blocks.push(block); // ブロックを配列に追加
    return block;
}

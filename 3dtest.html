function worldgen(){
    // 地形生成
    function generateTerrain(width, depth) {
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < depth; z++) {
                // シンプルックスノイズを使用して高さを決定
                const height = Math.floor(simplex.noise2D(x * 0.1, z * 0.1) * 3 + 3);

                // 高さに応じてブロックを生成
                for (let y = 0; y <= height; y++) {
                    createBlock(x, y, z);
                }
            }
        }
    }
    // 地形を生成
    generateTerrain(10, 10); // 幅10、高さ10の地形を生成
}

function createBlock(x, y, z) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // 緑のブロック
    //const loader = new THREE.TextureLoader();
    //const texture = loader.load('resource/texture/nature/cobblestone.png');
    //const material = new THREE.MeshStandardMaterial({ map: texture });
    const block = new THREE.Mesh(geometry, material);
    block.position.set(x, y, z);
    scene.add(block);
    blocks.push(block); // ブロックを配列に追加
    return block;
}

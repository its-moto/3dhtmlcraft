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
    const loadPic = new THREE.TextureLoader();

    // コールバック関数でテクスチャの読み込みを確認
    loadPic.load(
        'resource/texture/nature/cobblestone.png', // テクスチャのパス
        function (texture) {
            // テクスチャが正常に読み込まれた場合
            let material = [
                new THREE.MeshBasicMaterial({ map: texture }),
                new THREE.MeshBasicMaterial({ map: texture }),
                new THREE.MeshBasicMaterial({ map: texture }),
                new THREE.MeshBasicMaterial({ map: texture }),
                new THREE.MeshBasicMaterial({ map: texture }),
                new THREE.MeshBasicMaterial({ map: texture })
            ];

            const block = new THREE.Mesh(geometry, material);
            block.position.set(x, y, z);
            scene.add(block);
            blocks.push(block); // ブロックを配列に追加
        },
        undefined, // プログレスコールバック（必要に応じて追加）
        function (error) {
            console.error('テクスチャの読み込みに失敗しました:', error); // エラーハンドリング
        }
    );
}

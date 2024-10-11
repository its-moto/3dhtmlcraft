function genTree(treetype = 0,x,y,z){
    if (treetype == 0){ //normal oak tree
        const treehigh = 6;
        for (let i = 1 ; i <= treehigh ; i++){
            createBlock(x, y+i, z, 17); // 木の幹
        }
        for (let ly = 1 ; ly <=5 ; ly++){
            if (ly <=2){
                for (let lx = 1; lx <=5 ; lx++){
                    for (let lz = 1; lz <=5 ; lz++){
                            createBlock(x-3+lx, y + treehigh -3 + ly, z-3+lz, 18); // 木の幹
                    }
                }
            }else if (ly ==3) {
                createBlock(x+1, y +treehigh+ ly-3, z, 18);
                createBlock(x-1, y +treehigh+ ly-3, z, 18);
                createBlock(x, y +treehigh+ ly-3, z-1, 18);
                createBlock(x, y +treehigh+ ly-3, z+1, 18);
                createBlock(x+1, y +treehigh+ ly-3, z+1, 18);
            }else {
                createBlock(x+1, y +treehigh+ ly-3, z, 18);
                createBlock(x-1, y +treehigh+ ly-3, z, 18);
                createBlock(x, y +treehigh+ ly-3, z-1, 18);
                createBlock(x, y +treehigh+ ly-3, z+1, 18);
                createBlock(x, y +treehigh+ ly-3, z, 18);
            }
        }
    }
}

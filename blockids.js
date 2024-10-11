function loadBlockIds() {
    const tags = {
        0: { name: "air"},
        1: { name: "dirt", color: () => returncolor(0x734303) },
        2: { name: "grass", color: () => colorRandom({ rgbtype: 'g', gremin: 0xd6, gremax: 0xf0 }) },
        3: { name: "stone", color: () => colorRandom({ rgbtype: 'rgb', allmin: 0x55, allmax: 0x65}) },
        4: { name: "cobblestone", color: () => returncolor(0x333333) },
        5: { name: "oakplank", color: () => returncolor(0xdeb328) },
        6: { name: "oaksapling", color: () => returncolor(0x56b31d) },
        7: { name: "bedrock", color: () => returncolor(0x1a1a1a) },
        8: { name: "flowingwater", color: () => returncolor(0x1a1a1a) },
        9: { name: "stillwater", color: () => returncolor(0x1a1a1a) },
        10: { name: "flowinglava", color: () => returncolor(0x1a1a1a) },
        11: { name: "stilllava", color: () => returncolor(0x1a1a1a) },
        12: { name: "sand", color: () => returncolor(0x1a1a1a) },
        13: { name: "gravel", color: () => returncolor(0x1a1a1a) },
        14: { name: "goldore", color: () => returncolor(0x1a1a1a) },
        15: { name: "ironore", color: () => returncolor(0x1a1a1a) },
        16: { name: "coalore", color: () => returncolor(0x1a1a1a) },
        17: { name: "oakwood", color: () => returncolor(0x7d5202) },
        18: { name: "oakleaves", color: () => returncolor(0x04940c), transparent: true },
    };
    return tags;
}

function returncolor(color){
    return color;
}
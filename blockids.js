function loadBlockIds() {
    const tags = {
        1: { name: "dirt", color: (0x734303) },
        2: { name: "grass", color: () => colorRandom({ rgbtype: 'g', gremin: 0xd6, gremax: 0xf0 }) },
        3: { name: "stone", color: () => colorRandom({ rgbtype: 'rgb', allmin: 0x55, allmax: 0x65}) },
        4: { name: "oakplank", color: (0xdeb328) },
    };
    return tags;
}

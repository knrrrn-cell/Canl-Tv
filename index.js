const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 7000;

// Eklenti Manifest (Tanım) Bilgileri
const manifest = {
    id: "org.nuvio.beinsports",
    version: "1.0.0",
    name: "BeIN Sports Canlı",
    description: "BeIN Sports 1, 2, 3, 4 Canlı Yayın Eklentisi",
    types: ["tv", "movie"],
    catalogs: [
        {
            type: "tv",
            id: "bein_channels",
            name: "BeIN Sports Kanalları"
        }
    ],
    resources: ["catalog", "stream"],
    idPrefixes: ["bein_"]
};

// Kanal Listesi Veritabanı
const channels = [
    {
        id: "bein_1",
        type: "tv",
        name: "BeIN Sports 1",
        poster: "https://i.imgur.com/7D29wJn.png",
        description: "BeIN Sports 1 Canlı Yayın",
        url: "https://zeus728177.cfd/m/AQ_b_k6Gpqj7Qy0i_yKxcXMFiQaOoKT7G8T88uPqxAD7OMpACFB_8_FO-A"
    },
    {
        id: "bein_1_yedek",
        type: "tv",
        name: "BeIN Sports 1 (Yedek)",
        poster: "https://i.imgur.com/7D29wJn.png",
        description: "BeIN Sports 1 Alternatif Yayın",
        url: "https://hls2.dostdemotv.com/hls/beinspor1/index.m3u8"
    },
    {
        id: "bein_2",
        type: "tv",
        name: "BeIN Sports 2",
        poster: "https://i.imgur.com/7D29wJn.png",
        description: "BeIN Sports 2 Canlı Yayın",
        url: "https://hls.dostdemotv.com/hls/beinspor2hd/index.m3u8"
    },
    {
        id: "bein_3",
        type: "tv",
        name: "BeIN Sports 3",
        poster: "https://i.imgur.com/7D29wJn.png",
        description: "BeIN Sports 3 Canlı Yayın",
        url: "https://hls.dostdemotv.com/hls/beinspor3hd/index.m3u8"
    },
    {
        id: "bein_4",
        type: "tv",
        name: "BeIN Sports 4",
        poster: "https://i.imgur.com/7D29wJn.png",
        description: "BeIN Sports 4 Canlı Yayın",
        url: "https://hls.dostdemotv.com/hls/beinspor4/index.m3u8"
    }
];

// Manifest Route
app.get('/manifest.json', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(manifest);
});

// Catalog Route (Kanalları Listeleme)
app.get('/catalog/:type/:id.json', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.params.type === 'tv' && req.params.id === 'bein_channels') {
        const metas = channels.map(c => ({
            id: c.id,
            type: c.type,
            name: c.name,
            poster: c.poster,
            description: c.description
        }));
        res.json({ metas });
    } else {
        res.json({ metas: [] });
    }
});

// Stream Route (Tıklanan Kanalın M3U8 Linkini Çekme)
app.get('/stream/:type/:id.json', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const channelId = req.params.id;
    const channel = channels.find(c => c.id === channelId);

    if (channel) {
        res.json({
            streams: [
                {
                    title: `${channel.name} - Canlı Yayın`,
                    url: channel.url
                }
            ]
        });
    } else {
        res.json({ streams: [] });
    }
});

app.listen(PORT, () => {
    console.log(`Addon aktif, port: ${PORT}`);
});

let popupJson = [
    {
        'LngLat': [133.91774108127242, 34.66596367986325],
        'html': {
            'title': "Hiroki Ito's Recommended Spots in Okayama",
            'date': '岡山県オススメ60スポット',
            'link': 'https://go-out.github.io/hirokiito/'
        }
    }
]

// 地図にポップアップを追加
map.on('load', () => {
    for (const popup of popupJson) {
        new mapboxgl.Popup({
            closeOnClick: false,
            className: "goout"
        })
            .setLngLat(popup.LngLat)
            .setHTML(`
            <strong>${popup.html.title}</strong><br>
            <a href="${popup.html.link}" target="_blank">
            ${popup.html.date}
            </a>
            `)
            .addTo(map)
    };
});
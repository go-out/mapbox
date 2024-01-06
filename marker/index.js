'use strict'
// addIcons(オブジェクト名.features);

// 地図にマーカーを追加
function addIcons(arr) {
    for (const marker of arr) {
        const el = document.createElement('div');
        el.className = marker.properties.tags;

        if (marker.properties.iconSize) {
            const url = marker.properties.iconSize[0];
            el.style.width = marker.properties.iconSize[1];
            el.style.height = marker.properties.iconSize[2];
            el.style.backgroundImage = `url(${url})`;
        }

        new mapboxgl.Marker(el, {
            offset: [0, 0]
        })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map)

        el.addEventListener('click', () => {
            map.flyTo({
                center: marker.geometry.coordinates,
                essential: true,
                zoom: marker.properties.zoom
            })
        })
    };
};

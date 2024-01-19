'use strict'

document.addEventListener("DOMContentLoaded", () => {
    // ジオコーダーコントロールを追加
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: false,
        zoom: 17.5,
        language: 'ja',
        country: 'jp',
        mapboxgl: mapboxgl,
        reverseGeocode: true
    })

    // ジオコーダー を #geocoder に配置
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    const thisLatLng = document.querySelector('#latlng');
    const thisAddress = document.querySelector('#address');

    // ジオコーダーの結果後にドラッグ可能マーカーを設定
    geocoder.on('result', function (e) {
        let marker = new mapboxgl.Marker({
            draggable: true,
            color: "red"
        })
            .setLngLat(e.result.center)
            .addTo(map);

        // マーカーの座標を表示
        function onDragEnd() {
            const lngLat = marker.getLngLat();
            thisLatLng.innerHTML = `
            <strong id="longitude">${lngLat.lng}</strong>,
            <strong id="latitude">${lngLat.lat}</strong>
            `;

            // Mapbox リバースジオコーディング
            let uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?language=ja&access_token=${mapboxgl.accessToken}`;
            fetchData(uri).then(function (response) {
                return response.text().then(function (jsonStr) {
                    var data = JSON.parse(jsonStr);
                    var context = data.features[0].place_name.replace(/\,/g, "");
                    thisAddress.textContent = context;
                });
            }).catch(err => { console.log(err); });

            async function fetchData(_uri) {
                const res = await fetch(_uri);
                const data = await res;
                return data;
            };
        }

        onDragEnd();
        marker.on('dragend', onDragEnd);
    });
});
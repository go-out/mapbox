# [Mapbox GL JS に マーカー と ポップアップ を追加する](https://docs.mapbox.com/jp/help/tutorials/custom-markers-gl-js/)

* [地図にマーカーを追加する](https://docs.mapbox.com/mapbox-gl-js/api/markers/)
```
const marker = new mapboxgl.Marker()
    .setLngLat([マーカーの座標])
    .addTo(map);
```

* マーカーの色指定 と [ドラッグ可能マーカー](https://docs.mapbox.com/jp/mapbox-gl-js/example/drag-a-marker/)
```
const marker = new mapboxgl.Marker({
    color: "色コード",
    draggable: true
})
    .setLngLat([マーカーの座標])
    .addTo(map);
```
___

## JSONデータ[^1]　を読み込み、地図に複数のマーカーを追加
[^1]: JSONデータが大きい場合は、外部ソースとして読み込むことを推奨されています。

マーカー・ポップアップの詳細を設定するJSONデータ
```
const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    }
  ]
};
```

地図にマーカーを追加するJavaScript
```
for (const marker of geojson.features) {
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
}
```
___

* [マーカーのスタイル設定に必要なCSSを追加](https://docs.mapbox.com/jp/mapbox-gl-js/example/custom-marker-icons/)[^2]
[^2]: .marker の background-image としてマーカーに使用する画像ファイルを追加する など

***

### ポップアップの設定に必要な JavaScript[^3] と CSS[^4] を追加
[^3]: new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
を地図にポップアップを追加するJavaScriptに書き換える

地図にポップアップを追加するJavaScript
```
new mapboxgl.Marker(el)
.setLngLat(marker.geometry.coordinates)
.setPopup(
  new mapboxgl.Popup({ offset: 25 })
  .setHTML(`
    <h3>${marker.properties.title}</h3>
    <p>${marker.properties.description}</p>
    `
  )
)
.addTo(map);
```

[^4]: 例)
.mapboxgl-popup {
  max-width: 200px;
}
.mapboxgl-popup-content {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}

https://commons.wikimedia.org/wiki/Category:Ionicons

---

マーカーにクリックイベントを追加
```
el.addEventListener('click', (e) => {
  map.flyTo({
    center: marker.geometry.coordinates,
    zoom: 3,
    bearing: 0,

    // These options control the flight curve, making it move
    // slowly and zoom out almost completely before starting
    // to pan.
    speed: 0.75, // make the flying slow
    curve: 1, // change the speed at which it zooms out

    // This can be any easing function: it takes a number between
    // 0 and 1 and returns another number between 0 and 1.
    easing: (t) => t,

    // this animation is considered essential with respect to prefers-reduced-motion
    essential: true
  });
})
```
マーカーをクリックした時、地図の中心がマーカーの座標に移動する
* [場所に飛ぶ](https://docs.mapbox.com/jp/mapbox-gl-js/example/flyto/)
* [場所にゆっくり飛ぶ](https://docs.mapbox.com/jp/mapbox-gl-js/example/flyto-options/)

https://docs.mapbox.com/mapbox-gl-js/api/sources/
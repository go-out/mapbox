map.on('load', () => {
  // クリックするとポップアップが表示されるポリゴンを追加
  map.addSource('polygonPopup', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [135.4953517829611, 34.62702765533572],
                [135.4960245179385, 34.627339317979306],
                [135.50391050613052, 34.64546789712162],
                [135.48776750786493, 34.63920320769225],
                [135.48717317682286, 34.63879986177503],
                [135.48641471397286, 34.63357632592684],
                [135.4953517829611, 34.62702765533572]
              ]
            ]
          },
          'properties': {
            'title': 'やるぞ ‼',
            'date': '大阪ヘルスバンクニュース掲示板',
            'link': 'https://go-out.github.io/do/',
            'zoom': 14
          }
        }
      ]
    }
  });

  map.addLayer({
    'id': 'fillPolygon',
    'type': 'fill',
    'source': 'polygonPopup',
    'layout': {},
    'paint': {
      'fill-color': 'lemonchiffon',
      'fill-opacity': 0.75
    }
  });

  map.addLayer({
    'id': 'linePolygon',
    'type': 'line',
    'source': 'polygonPopup',
    'layout': {},
    'paint': {
      'line-color': 'lightskyblue',
      'line-width': 5
    }
  });

  map.on('click', 'fillPolygon', (e) => {
    new mapboxgl.Popup({
      className: "goout"
    })
      .setLngLat(e.lngLat)
      .setHTML(`
      <strong>${e.features[0].properties.title}</strong><br>
      <a href="${e.features[0].properties.link}" target="_blank">
      ${e.features[0].properties.date}
      </a>
      `)
      .addTo(map);
    map.flyTo({
      center: e.lngLat,
      essential: true,
      zoom: e.features[0].properties.zoom
    });
  });

  map.on('mouseenter', 'fillPolygon', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'fillPolygon', () => {
    map.getCanvas().style.cursor = '';
  });
});

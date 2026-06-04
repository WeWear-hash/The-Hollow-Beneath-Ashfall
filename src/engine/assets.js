(function () {
  window.HBA = window.HBA || {};
  HBA.Assets = {
    images: {},
    loaded: 0,
    total: 0,
    loadAll: function (done, progress) {
      var refs = [];
      Object.keys(HBA.Content.assets.tilesets).forEach(function (key) {
        refs.push(["tileset:" + key, HBA.Content.assets.tilesets[key].src]);
      });
      Object.keys(HBA.Content.assets.sprites).forEach(function (key) {
        refs.push(["sprite:" + key, HBA.Content.assets.sprites[key].src]);
      });
      this.total = refs.length;
      refs.forEach(function (ref) {
        var img = new Image();
        img.onload = img.onerror = function () {
          HBA.Assets.loaded++;
          if (progress) progress(HBA.Assets.loaded, HBA.Assets.total);
          if (HBA.Assets.loaded >= HBA.Assets.total) done();
        };
        img.src = ref[1];
        HBA.Assets.images[ref[0]] = img;
      });
    },
    tile: function (key) { return this.images["tileset:" + key]; },
    sprite: function (key) { return this.images["sprite:" + key]; }
  };
})();

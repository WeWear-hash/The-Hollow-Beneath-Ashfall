(function () {
  window.HBA = window.HBA || {};
  HBA.Content = HBA.Content || {};
  HBA.Content.story = {
    startMap: "arrival",
    start: { x: 120, y: 160 },
    endings: {
      escape: {
        name: "Escape Ending",
        text: "You leave Ashfall at dawn. Behind you the bell rings from under the road, counting every step you refuse to remember."
      },
      burn: {
        name: "Ashfall Burns Ending",
        text: "The Final Ember catches. Streets, chapel, school, hospital, mine: all of it becomes clean ash. The Hollow dies, but so do the names it kept."
      },
      vessel: {
        name: "Hollow Vessel Ending",
        text: "You open yourself and Ashfall pours in. The town stands again, bright and wrong, every window watching through your eyes."
      },
      remembered: {
        name: "Remembered Ending",
        text: "You ring the Memory Bell. The dead do not rise, but they are named. The Hollow loosens its hand, and Ashfall finally becomes morning."
      }
    }
  };
})();

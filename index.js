const async = require('async');

module.exports = {
  'Archive all items' : function (client) {
    const articlesSelector = 'a.item_link.start_articleview';
    let total = 0;
    let current = 0;

    client
      .url('https://getpocket.com/login')
      .waitForElementVisible('body', 1000)
      .assert.visible('input#feed_id[type=text]')
      .setValue('input#feed_id[type=text]', process.env.POCKET_USER)
      .setValue('input#login_password', process.env.POCKET_PASS)
      .click('input.btn.login-btn-email')
      .waitForElementVisible('li.pagenav_bulkedit > a', 5000);

    async.doWhilst(
      callback => {
        client
          .url('https://getpocket.com/a/queue/grid/')
          .waitForElementVisible('li.pagenav_bulkedit > a', 5000)
          .click('li.pagenav_bulkedit > a')
          .waitForElementVisible('li.bulkedit-archive > a > span.bulkedit-icon', 1000)
          .click('a.item_link.start_articleview')
          .keys([client.Keys.END])
          .pause(2000)
          .keys([client.Keys.END])
          .pause(2000)
          .keys([client.Keys.SHIFT])
          .useXpath()
          .click('(//a[@class="item_link start_articleview"])[last()]')
          .useCss()
          .keys([client.Keys.NULL])
          .pause(500)
          .click('li.bulkedit-archive > a > span.bulkedit-icon')
          .pause(2000)
          .refresh()
          .waitForElementVisible('li.pagenav_bulkedit > a', 5000)
          .elements('css selector', articlesSelector, function(array) {
            current = array.value.length;
            callback();
          });
      },
      () => {
        total += current;
        console.log('total: ' + total, ', current: ' + current);
        return current !== 0;
      },
      function (err, n) {
        console.log('done');
      }
    );
  }
};

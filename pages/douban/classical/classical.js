Page({
  data: {
    songs: [],
    showLoading: true,
    offset: 0
  },
  
  viewDetail: function(e){
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id=' + ds.id + '&title=' + ds.title
    })
  },

  scrollR: function(num){
    var that = this,
      _num = num;
    wx.request({
      'url': 'https://api.douban.com/v2/music/search'
      ,'data': {
        'tag': '%E5%8F%A4%E5%85%B8',
        'start': _num,
        'count': 20
      }
      ,'method': 'GET'
      ,'success': function(data){
        if (data.statusCode == 200 && /ok/.test(data.errMsg)) {
          that.setData({
        songs: that.data.songs.concat(data.data.musics),
        showLoading: false,
        offset: 20 + _num
      });
        }
      }
    })
  },

  onLoad: function () {
    this.scrollR(0);
  },

  scroll: function(e){
  this.scrollR(this.data.offset);
  }
})
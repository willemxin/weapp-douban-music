var app = getApp()
Page({
    data: {
    	options: {},
    	datas: {}
    },
    viewDetail: function(e){
      var ds = e.currentTarget.dataset;
      wx.navigateTo({
        url: '../detail/detail?id=' + ds.id + '&title=' + ds.title
      })
    },
    onLoad: function(options) {
    	this.setData({
    		options: options
    	});
        var that = this;
        wx.request({
            'url': 'https://api.douban.com/v2/music/' + this.data.options.id,
            'method': 'GET',
            'success': function(data) {
                if (data.statusCode == 200 && /ok/.test(data.errMsg)) {
                	console.log(data)
                    that.setData({
                        datas: data.data
                    });
                }
            }
        })

    }
})

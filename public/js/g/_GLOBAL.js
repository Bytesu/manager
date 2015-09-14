/**
 * 后台管理全局定义
 * Created by bytesu on 15/8/6.
 */
//请求api需要加的接口
var headers = {
    "term_id": "_ADMIN_",
    "Cache-Control": "no-cache, no-store, must-revalidate"
};
var apiUrl = "http://api.test.xueyuanpai.com/v1/";
$.ajaxSetup({
    headers: headers,
    //timeout : 5000,
    xhrFields: {
        withCredentials: true
    },
    beforeSend: function (XMLHttpRequest) {
        //   alert('B');
        //XMLHttpRequest.setRequestHeader("term_id","_ADMIN_");
    },
    complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
        if (status == 'timeout') {//超时,status还有success,error等值的情况
            //   alert("超时");
        }
    }
});


var G = {
    request: function (setting, cb) {
        var opt = {
            type: 'get',
            dataType: 'json'
        };
        setting = $.extend(opt, setting);
        $.ajax(setting).then(function (data, textStatus, jqXhr) {
            if (!!data.code) {
                alert(data.msg);
            } else {
                cb(data.data)
            }
        }, function (jqXhr, textStatus, err) {
            alert(jqXhr.statusText || textStatus);
        });
    },
    formatPrice: function (price) {//格式化价格
        price = price / 100;
        return price.toFixed(2);
    }
};
(function ($) {
    $.extend({
        /**!注意
         * 使用此分页注意include pager.html 页面
         * @param opt
         * @param cb
         */
        pager: function (opt, cb) {
            this.class_ = {
                previous: 'previous',
                next: 'next',
                disabled: 'disabled'
            };
            var that = this;
            var opt_ = {
                from: 0,
                last: false//最后一夜
            };
            var page = $('#pagerTemp').tmpl({});
            opt_ = $.extend(opt_, opt);
            if (opt_.from == 0) {
                page.find('.' + this.class_.previous).addClass(this.class_.disabled)
            }
            ;
            if (opt_.last) {
                page.find('.' + this.class_.next).addClass(this.class_.disabled)
            }
            ;
            $(opt.ele).html(page);
            $(opt.ele).find('li').click(function () {
                if ($(this).hasClass(that.class_.disabled)) {
                    return false;
                } else {
                    if ($(this).hasClass(that.class_.previous)) {
                        opt_.from -= opt_.size;
                    } else if ($(this).hasClass(that.class_.next)) {
                        opt_.from += opt_.size;
                    }
                    cb(opt_);
                }
            });
        }
    });
    $.fn.extend({
        //简单图片查看器
        imager: function (opt, cb) {
            var Imager = function (ele) {
                this.$ele = $(ele);
                this.ctner = 'imager-ctner';
                this.urls = this.$ele.data('urls').split(',');
                this.curl = this.urls[0];
                this.init();
            };
            Imager.prototype.init = function () {
                var that = this;
                this.$ele.click(function () {
                    //alert(that.urls[0]);
                    that.clickHandler();
                });
            };

            Imager.prototype.clickHandler = function () {
                var that = this;
                var ctner = $('#' + this.ctner);
                if (ctner.length == 0) {
                    var _css = {position: 'absolute', top: '0', bottom: 0, right: 0, left: 0};
                    ctner = $('<div>').attr('id', this.ctner).css($.extend({}, {
                        background: '#999',
                        opacity: '.8'
                    }, _css)).appendTo($('body'));
                    $('<div>').css($.extend({}, _css, {
                        textAlign: 'center',
                        top: '80%',
                        padding: '5px'
                    })).attr('id', 'ctner_bottom').appendTo($('body'));
                    $('<div>').css($.extend({}, _css, {
                        textAlign: 'center',
                        bottom: '20%',
                        padding: '5px'
                    })).attr('id', 'ctner_top').appendTo($('body'));
                }
                ;
                $('#ctner_bottom').delegate('img', 'click', function () {
                    $('#ctner_top').find('img').attr('src', $(this).attr('src'));
                });
                this.urls.forEach(function (val, idx) {
                    $('<img>').attr('src', val).css({
                        height: '100%', padding: '5px'
                    }).appendTo($('#ctner_bottom'));
                });


                $('<img>').attr('src', this.curl).css({
                    height: '100%', padding: '5px'
                }).appendTo($('#ctner_top'));
                $('<div>').html('X').css({
                    width: '50px', height: '50px', textAlign: 'center', zIndex: 100, position: 'fixed', top: 0,
                    right: 0
                }).click(function () {
                    that.close();
                }).appendTo($('body'));
            };


            Imager.prototype.close = function () {
                $('#', this.ctner).hide();
            };
            return this.each(function (idx, val) {
                new Imager(val);
            });
        }
    });
})(jQuery);


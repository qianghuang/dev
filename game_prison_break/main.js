/**
 * @author Suker
 * 配置页
 */
require.config({
	baseUrl: 'js'
});
require([
    'lib/link',
    'index'
], function($, index) {
    $.init(window.innerWidth, window.innerHeight)
    .pushImage([
        { id: 'logo', src: 'img/logo.jpg' },
        { id: 'btns1', src: 'img/btns1.png' }
    ], function(loaded, count, type) {
        //console.error('下载完成');
    })
    .initAudio([
        { id: '1', src: 'sound/1.mp3', preload: true }
    ])
    // .asyncImage([
        // { id: 'endPanel', src: 'img/endPanel.jpg' },
        // { id: 'shine1', src: 'img/shine1.png' },
        // { id: 'shine2', src: 'img/shine2.png' },
        // { id: 'shine3', src: 'img/shine3.png' },
        // { id: 'shine4', src: 'img/shine4.png' }
    // ])
    .loadingCallBack(function(loaded, count) {
        
    })
    .main(function() {
        index.init();
    });
});
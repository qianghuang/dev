define([
    'lib/link'
], function ($) {
    $.asyncImage([
        { id: 'host3', src: 'img/roles/host3.png' }
    ]);
    var host_imageNames = ['host3'];
    var host_rects = 
    [
        [
            [0, 0, 26, 37],
            [27, 0, 19, 36],
            [46, 0, 22, 38]
        ]
    ];
    var host_frames = 
    [
        {
            aR: [-15, -30, 30, 30],
            bR: [-10, -25, 20, 20],
            fA: [
                [0, 0, -14, -37, 0]
            ]
        },
        {
            aR: [-15, -30, 30, 30],
            bR: [-10, -25, 20, 20],
            fA: [
                [0, 1, -9, -36, 0]
            ]
        },
        {
            aR: [-15, -30, 30, 30],
            bR: [-10, -25, 20, 20],
            fA: [
                [0, 2, -12, -37, 0]
            ]
        }
    ];
    var host_actions = 
    [
        { loop: true, frames: [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [2, 0, 0, 0],
            [1, 0, 0, 0]
        ] }
    ];
    return {
        get: function(index, names) {
            var _host_actions = (index >= 0 && host_actions[index]) ? [host_actions[index]] : host_actions;
            return new $.action.role([], 0, 0, 0, names ? names : host_imageNames, host_rects, host_frames, _host_actions || host_actions);
        }
    };
});


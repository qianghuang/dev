define([
    'lib/link'
], function ($) {
    $.asyncImage([
        { id: 'shine', src: 'img/roles/shine.png' }
    ]);
    var shine_imageNames = ['shine'];
    var shine_rects = 
    [
        [
            [0, 20, 101, 64],
            [119, 19, 112, 66],
            [238, 13, 140, 80],
            [391, 0, 103, 100]
        ]
    ];
    var shine_frames = 
    [
        {
            aR: [-15, -30, 30, 30],
            bR: [-10, -25, 20, 20],
            fA: [
                [0, 0, -51, -34, 0]
            ]
        },
        {
            aR: [-15, -30, 30, 30],
            bR: [-10, -25, 20, 20],
            fA: [
                [0, 1, -54, -34, 0]
            ]
        },
        {
            aR: [-15, -30, 30, 30],
            bR: [-10, -25, 20, 20],
            fA: [
                [0, 2, -58, -35, 0]
            ]
        },
        {
            aR: [-15, -30, 30, 30],
            bR: [-10, -25, 20, 20],
            fA: [
                [0, 3, -49, -45, 0]
            ]
        }
    ];
    var shine_actions = 
    [
        { loop: false, frames: [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [2, 0, 0, 0],
            [3, 0, 0, 0]
        ] }
    ];
    return {
        get: function(index, names) {
            var _shine_actions = (index >= 0 && shine_actions[index]) ? [shine_actions[index]] : shine_actions;
            return new $.action.role([], 0, 0, 0, names ? names : shine_imageNames, shine_rects, shine_frames, _shine_actions || shine_actions);
        }
    };
});


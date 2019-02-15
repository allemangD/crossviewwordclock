// function stuff() {
//     let now = new Date();
//
//     let sec = now.getSeconds();
//
//     return [[
//         [2, false],
//         [1, false],
//         [0, false],
//         [1, Math.floor(sec / 10) === 1],
//         [2, Math.floor(sec / 10) === 2],
//         [3, Math.floor(sec / 10) === 3],
//         [4, Math.floor(sec / 10) === 4],
//         [5, Math.floor(sec / 10) === 5],
//         [6, false],
//         [7, false],
//         [8, false],
//         [9, false],
//     ], [
//         [2, false],
//         [1, false],
//         [0, sec % 10 === 0],
//         [1, sec % 10 === 1],
//         [2, sec % 10 === 2],
//         [3, sec % 10 === 3],
//         [4, sec % 10 === 4],
//         [5, sec % 10 === 5],
//         [6, sec % 10 === 6],
//         [7, sec % 10 === 7],
//         [8, sec % 10 === 8],
//         [9, sec % 10 === 9],
//     ]];
// }
//
//
// function tags() {
//     return stuff().map(row =>
//         $('<div>').html(
//             row.map(data => {
//                     let [word, shift] = data;
//                     return $('<span>')
//                         .text(word)
//                         .addClass(shift ? 'shift' : '');
//                 }
//             )
//         )
//     );
// }

function $$(y, x) {
    return $(`._${y} ._${x}`);
}

function update() {
    $('.shift').removeClass('shift');

    let now = new Date();
    let sec = now.getSeconds();
    let mins = now.getMinutes();
    let hour = now.getHours();

    let words = {
        'ITS': $$(0, 0),
        'A': $$(0, 2),
        'HALF': $$(0, 3),
        'TEN1': $$(0, 4),

        'QUARTER': $$(1, 0),
        'TWENTY': $$(1, 1),

        'FIVE1': $$(2, 0),
        'TILL': $$(2, 2),
        'PAST': $$(2, 3),

        'ONE': $$(3, 0),
        'TWO': $$(3, 1),
        'SIX': $$(3, 2),
        'NINE': $$(3, 3),

        'THREE': $$(4, 0),
        'FOUR': $$(4, 1),
        'FIVE2': $$(4, 2),

        'SEVEN': $$(5, 0),
        'EIGHT': $$(5, 1),
        'TEN2': $$(5, 2),

        'ELEVEN': $$(6, 0),
        'TWELVE': $$(6, 2),

        'O': $$(7, 1),
        'CLOCK': $$(7, 3),
    };

    let OF = 'PAST';
    if (now.getMinutes() > 30) {
        mins = 60 - mins;
        hour += 1;
        if (hour === 0) hour = 12;
        OF = 'TILL';
    }
    hour %= 12;

    let five = Math.floor((mins + sec / 60) / 5 + .5);
    console.log(five);

    let HOUR = [
        'TWELVE', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE2', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN2', 'ELEVEN'
    ][hour];

    let choices = {
        0: ['ITS', HOUR, 'O', 'CLOCK'],
        1: ['ITS', 'FIVE1', OF, HOUR],
        2: ['ITS', 'TEN1', OF, HOUR],
        3: ['ITS', 'A', 'QUARTER', OF, HOUR],
        4: ['ITS', 'TWENTY', OF, HOUR],
        5: ['ITS', 'TWENTY', 'FIVE1', OF, HOUR],
        6: ['ITS', 'HALF', OF, HOUR]
    };

    for(let w in choices[five]){
        words[choices[five][w]].addClass('shift');
    }

    setTimeout(update, 10000);
}

function tags() {
    let grid = [
        ["IT'S", "J", "A", "HALF", "TEN"],
        ["QUARTER", "TWENTY"],
        ["FIVE", "X", "TILL", "PAST"],
        ["ONE", "TWO", "SIX", "NINE"],
        ["THREE", "FOUR", "FIVE"],
        ["SEVEN", "EIGHT", "TEN"],
        ["ELEVEN", "V", "TWELVE"],
        ["ESA", "O'CLOCK", "KNS"],
    ];

    return grid.map((row, i) =>
        $('<div>')
            .addClass(`_${i}`)
            .html(
                row.map((n, j) =>
                    $('<span>')
                        .addClass(`_${j}`)
                        .text(n))
            ));
}

function init() {
    $('#left').html(tags());
    $('#right').html(tags());

    update();
}
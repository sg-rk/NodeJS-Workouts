// find out the sum of integer
let ar = [
    2,
    3,
    5,
    [
        {
            "name": "Jhon Doe"
        },
        2,
        3,
        1,
        [
            true,
            1,
            2,
            [
                "name",
                1,
                2
            ]
        ],
        2,
        4
    ],
    1
];

let sumOf = 0;
const iterateAgain = (arr) => {
    for (let [i, e] of arr.entries()) {
        if (typeof e == 'number') {
            sumOf += e;
        }
        else if (Array.isArray(e)) {
            iterateAgain(e);
        }
    }
}
iterateAgain(ar);
console.log(sumOf);

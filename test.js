// Input: exp = “[()]{ } { ()() }” Output: Balanced
// Input: exp = “[(])” Output: Not Balanced

let str = "[]";
const checkBalance = (s) => {
    let a = [];
    for(let c of s) {
        if(['(', '[', '{'].includes(c)){
            a.push(c);
        }
        else if([')', ']', '}'].includes(c)){
            let lc = a[a.length-1];
            if((c == ')' && lc == '(') || (c == ']' && lc == '[') || (c == '}' && lc == '{')){
                a.pop();
            }
        }
        
    }
    if(a.length == 0) {
        console.log('Balanced!');
    }
    else {
        console.log('Not Balanced!');
    }
}
checkBalance(str);



if(ri == 0)
    dri = 2; (2-0) ma.length - ri;
    if(ci == 0)
        dci = 2 (2-0) ma[0].length - ci;
    else if(ci == 1)
        dci = 1 (2-1) ma[0].length - ci;
    else if(ci == 2)
        dci = 0 (2-2)

4 1 3
3 0 2
2 9 6

let ma = [ 
    [2, 3, 4, 5], 
    [9, 0, 1, 7],
    [6, 2, 3, 8],
    [8, 4, 2, 1]
];

const rotate90 = (ma) => {
    let ra = [];
    let ml = (ma.length-1);

    for(let [ri, e] of ma.entries()){ //
        let narray = [];
        for(let [ci] of e.entries()){ // 2,3,4
            let dci = ml - ri;  // 2
            let dri = (e.length-1) - ci; //2
            narray.unshift(ma[dri][dci]);
        }
        ra.push(narray);
    }
    return ra;    
}




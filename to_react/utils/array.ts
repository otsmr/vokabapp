
export const shuffleArray = (array:any[]):any[] => {

    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;

}

export const sortArray = (array:any[], param:string):any[] => {

    array = array.slice(0);
    array.sort((a, b) => {
        if (a[param] < b[param]) return -1;
        if (a[param] > b[param]) return 1;
        else return 0;
    });

    return array;

}
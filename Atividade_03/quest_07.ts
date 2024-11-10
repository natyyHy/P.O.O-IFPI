//FOR_EACH

const filter_par = (array:number[]) => {

   let pares: number[] = []
   array.forEach(element => {
   if(element % 2 === 0){
    pares.push(element)
   }
});
return pares
}

console.log(filter_par([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]))

//FILTER

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const filter_par_v2 = array.filter((numero) => numero % 2 === 0)
console.log(filter_par_v2)

function calculateCompoundInterest(arr){
    let principalSum = arr[0];
    let interestRate = arr[1] / 100;
    let compoundingPeriod = arr[2];
    let overallLength = arr[3];
    let compoundingFrequency = 12 / compoundingPeriod;
    let a =  Math.pow((1 + (interestRate / compoundingFrequency)), (compoundingFrequency * overallLength));
    let result = principalSum * a;
    console.log(result.toFixed(2));
}
calculateCompoundInterest([1500, 4.3, 3, 6]);

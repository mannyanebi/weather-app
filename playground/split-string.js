// let address = "Muhammadu Buhari Way, Abuja Municipal, Abuja, Nigeria";
let address = "Rayfield Resort, Jos South, Plateau State, Nigeria";

// let arrayOfAddressWords = address.split(" ");

// console.log(arrayOfAddressWords);

// let modifiedAddress = arrayOfAddressWords.join("+");
address = address.replace(/\s/g, "+");

console.log(encodeURIComponent(address));

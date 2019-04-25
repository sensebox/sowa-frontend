export class Phenomenon {

    constructor(
        public name: {
          label: string,
          lang: string
        },
        public description: {
                comment:string,
                lang: string
        }  ,
        public unit: string,
        public domain: string
    ) {  }
  
  }
  export class Sensor {

    constructor(
        public name: {
          label: string,
          lang: string
        },
        public description: {
                comment:string,
                lang: string
        }  ,
        public sensorElement: [{ 
           phenomenon: string,
           uoa: number
         }],
        public manufacturer: string,
        public price: number,
        public dataSheet: string,
        public lifePeriod: number,
        public device: string       
    ) {  }
  
  }
  
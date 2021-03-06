export class Phenomenon {

    constructor(
        public uri: string,
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
        public uri: string,
        public name: {
          label: string,
          lang: string
        },
        public description: {
                comment:string,
                lang: string
        }  ,
        public sensorElement: { 
           phenomenon: string[],
           uoa: number[]
         },
        public manufacturer: string,
        public price: number,
        public dataSheet: string,
        public lifePeriod: string,
        public device: string,
        public image: string       
    ) {  }
  
  }

  export class Domain {

    constructor(
        public uri: string,
        public name: {
          label: string,
          lang: string
        },
        public description: {
                comment:string,
                lang: string
        }
    ) {  }
  
  }

    export class Device {

      constructor(
          public uri: string,
          public name: {
            label: string,
            lang: string
          },
          public description: {
                  comment:string,
                  lang: string
          },
          public website: string,
          public image: string,
          public contact: string,
          public sensor: string
      ) {  }
  
  }
  
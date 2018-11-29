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
  
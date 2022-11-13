//get the poi locations
    //store in array
    async function getPOIInfo(){
        let result =await getPOI();
        let arr =[];
        let i=0;
        for(let poi of result){
            let loc = [];
            loc[1]= poi.lon;
            loc[0]=poi.lat;
            arr[i]=loc;
            i++;
        }
        return arr
    }
    async function crowds(pois: any){
        let pop = []
        let i=0;
        for(let l of pois ){
            let info = []
            info[0]=l[0];
            info[1]=l[1];
            let res =await tradeArea(l[0].toString()+"%7C"+l[1].toString());
            info[2]=res.data.length();
            pop[i]=info;
            i++
        }
        return pop
    }
    function startHelper(busses: number[][], checkNum: number, checkPlace: number):number{
        let on=busses[checkPlace][0];
        if(on>checkNum-.0036&&on<checkNum+.0036&&busses[checkPlace-1][0]<checkNum-.0035){
            return checkPlace;
        }
        else if(on>checkNum-.0036&&on<checkNum+.0036&&busses[checkPlace-1][0]>checkNum-.0035){
            return startHelper(busses, checkNum, checkPlace-1);
        }
        else if(on>checkNum+.0036){
            return startHelper(busses, checkNum, checkPlace-1);
        }
        else{
            return startHelper(busses, checkNum, checkPlace+1);
        }
        
    }
    function compute(busses: number[][],demand: number[][] ){
        //for each busses
        //.0036
        for(let b =0;b<demand.length-1;b++){
           //get start position
           let start;
           if(busses[0][0]==demand[b][0]-.0036){
            start=0;
           }
           else{
            start=startHelper(busses, demand[b][0], busses.length/2 );
           }
           while(busses[start][0]<=demand[b][0]+.0036){
            if(busses[start][1]>demand[b][1]-.0036&&busses[start][1]<demand[b][1]+.0036){
                busses[start][3]+=demand[b][2];
            }
            start++
           }
        }
        let finalList=[];
        let i=0;
        let min=Number.MAX_VALUE;
        let max=Number.MIN_VALUE;
        for(let b of busses){
            if(b[3]!=0){
                b[2]=(b[2]*20)-b[3];
                if(b[2]>max){
                    max=b[2];
                }
                if(b[2]<min){
                    min=b[2];
                }
                finalList[i]=b;
                i++;
            }
        }
        
        for (let b of finalList){
            if(b[2]>=0){
                b[3]=b[2]/(max/5);
            }
            if(b[2]<0){
                b[3]=b[2]/(min/5);
            }
        }
            //run distance for each demand
            //if the distance is within range add the demand to the busses
        //compute and save the difference format: [lat, lon, difference]

    }
  async  function passer(){
    let pois = await getPOIInfo();
    let demand = await crowds(pois);
    let busses = await theBus();
    let finalComp= compute(busses, demand);

  }
//get the bus stop info
    //info gotten is x and y and the frequency of busses
//run trade areas for poi
//compute the info from poi
//group poi with bus stop
//find difference



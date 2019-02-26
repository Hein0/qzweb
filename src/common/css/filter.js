/**
 * Created by hp on 2018/1/18.
 */
export default {
    filterContet:(str)=>{
      if(str&&str.length>30){
        return str.slice(0,30)+'...';
      }else {
        return str;
      }

    },
    imgFullUrl:(str)=>{
        if(str){
            return imgPath+str;
        }

    },
    formatData(str){
        debugger
        if(str&&str!=''){
            return str.split(",");
        }else{
            return []
        }
    }
};

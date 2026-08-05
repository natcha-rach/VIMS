export function createApp(){
  return {
    health(){ return {success:true,message:"VIMS API OK"}; }
  };
}

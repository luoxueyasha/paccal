//和html对接
function getCal() {
  let in_P = document.getElementById("in_P").value;
  let in_i = document.getElementById("in_i").value*0.01;
  let in_h = document.getElementById("in_h").value*0.01;
  let in_n = document.getElementById("in_n").value;
  let selval = document.getElementById("mySelect").value;
  let result = 0;
  //未选中时默认为fp
  switch(selval){
    case "fp":{
      result = cal_F_Pin(in_P, in_i, in_n,1); 
      break;
    }case "pf":{
      result = cal_F_Pin(in_P, in_i, in_n,2); 
      break;
    }
    case "fa":{
      result = cal_F_Ain(in_P, in_i, in_n,1); 
      break;
    }case "af":{
      result = cal_F_Ain(in_P, in_i, in_n,2); 
      break;
    }
    case "pa":{
      result = cal_P_Ain(in_P, in_i, in_n,1); 
      break;
    }
    case "ap":{
      result = cal_P_Ain(in_P, in_i, in_n,2); 
      break;
    }
    case "pg":{
      result = cal_P_Gin(in_P,in_i,in_n);
      break;
    }
    case "pa1":{
      result = cal_P_A1ihn(in_P,in_i,in_h,in_n);
      break;
    }
    default:{
      result = cal_F_Pin(in_P, in_i, in_n,1); 
      break;
    }
  }

  console.log(result);
  result = Math.round(result*1000)/1000;
  document.getElementById("result").innerText = result;
}

//fp-pf互算，mode为1则fp否则pf
function cal_F_Pin(p,i,n,mode) {
  let k = Math.pow(i+1,n)
  if(mode==1){
    return p*k;
  }else{
    return p/k;
  }
}

//fa-af互算，mode为1则fa否则af
function cal_F_Ain(a,i,n,mode) {
  let k = (Math.pow(i+1,n) - 1)/i;
  if(mode==1){
    return a*k;
  }else{
    return a/k;
  }
}

//pa-ap互算，mode为1则pa否则ap
function cal_P_Ain(a,i,n,mode) {
  let k = (Math.pow(i+1,n) - 1)/(i*Math.pow(i+1,n));
  if(n!=0){
    if(mode==1){
      return a*k;
    }else{
      return a/k;
    }
  }else{
    //n为无限时
    if(mode==1){
      return a/i;
    }else{
      return a*i;
    }
  }
}


//pg
function cal_P_Gin(g,i,n) {
  let t = Math.pow(1+i,n);
  let k = (t-(1+n*i))/(i*i*t);
  return g*k;
}
//pa1
function cal_P_A1ihn(a,i,h,n){
  let t1 = Math.pow(1+h,n);
  let t2 = Math.pow(1+i,-n);
  return a*(1-t1*t2)/(i-h);
}

//更改页面内容
function selfunc(){
  let selval = document.getElementById("mySelect").value;
  console.log(selval);
  switch(selval){

    case "fp":{
      document.getElementById("formula").innerText ="F=P(1+i)^n";
      document.getElementById("waitCal").innerText ="P:";
      document.getElementById("waitRes").innerText ="F=";
      document.getElementById("inH").hidden="hidden";
      break;
    }
    case "pf":{
      document.getElementById("formula").innerText ="P=F/(1+i)^n";
      document.getElementById("waitCal").innerText ="F:";
      document.getElementById("waitRes").innerText ="P=";
      document.getElementById("inH").hidden="hidden";
      break;
    }
    
    case "fa":{
      document.getElementById("formula").innerText ="F=A[(1+i)^n-1]/i";
      document.getElementById("waitCal").innerText ="A:";
      document.getElementById("waitRes").innerText ="F=";
      document.getElementById("inH").hidden="hidden";
      break;
    }
    case "af":{
      document.getElementById("formula").innerText ="A=Fi/[(1+i)^n-1]";
      document.getElementById("waitCal").innerText ="F:";
      document.getElementById("waitRes").innerText ="A=";
      document.getElementById("inH").hidden="hidden";
      break;
    }
    
    case "pa":{
      document.getElementById("formula").innerText ="P=A[(1+i)^n-1]/i(1+i)^n  （n取0时视为无限）";
      document.getElementById("waitCal").innerText ="A:";
      document.getElementById("waitRes").innerText ="P=";
      document.getElementById("inH").hidden="hidden";
      break;
    }
    case "ap":{
      document.getElementById("formula").innerText ="A=P(1+i)^n/[(1+i)^n-1]  （n取0时视为无限）";
      document.getElementById("waitCal").innerText ="P:";
      document.getElementById("waitRes").innerText ="A=";
      document.getElementById("inH").hidden="hidden";
      break;
    }
    case "pg":{
      document.getElementById("formula").innerText ="Pg=G[(1+i)^n-(1+ni)]/[i*i(1+i)^n]";
      document.getElementById("waitCal").innerText ="G:";
      document.getElementById("waitRes").innerText ="P=";
      document.getElementById("inH").hidden="hidden";
      break;
    }
    case "pa1":{
      document.getElementById("formula").innerText ="Pa1=A1([1-(1±h)^n*(1+i)^{-n}]/[i∓h]";
      document.getElementById("waitCal").innerText ="A1:";
      document.getElementById("waitRes").innerText ="P=";
      document.getElementById("inH").hidden="";
      break;
    }
    default:{
        document.getElementById("formula").innerText ="F=P(1+i)^n";
        document.getElementById("waitCal").innerText ="P:";
        document.getElementById("waitRes").innerText ="F=";
        document.getElementById("inH").hidden="hidden";
        break;
    }
  }
}
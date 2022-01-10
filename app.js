function getValue()
{
    var Ia=document.getElementById('Ia').value;
    var Ib=document.getElementById('Ib').value;
    var Ic=document.getElementById('Ic').value;
    var Va=document.getElementById('Va').value;
    var Vb=document.getElementById('Vb').value;
    var Vc=document.getElementById('Vc').value;
    var arr=[Ia,Ib,Ic,Va,Vb,Vc];
    document.getElementById('Ia').value='';
    document.getElementById('Ib').value='';
    document.getElementById('Ic').value='';
    document.getElementById('Va').value='';
    document.getElementById('Vb').value='';
    document.getElementById('Vc').value='';
    if(arr[0]=='' || arr[1]=='' || arr[2]=='' || arr[3]=='' || arr[4]=='' || arr[5]=='' )
    {alert("plz,provide phasors.......")}
   else{return arr }
   
}
function faultAnalysis()
{
    var data=getValue();
   
    var flag=false;
    for(var i=0;i<6;i++)
    {
        if((data[i].charCodeAt(0)>=65 && data[i].charCodeAt(0)<=90)|| 
        (data[i].charCodeAt(0)>=97 && data[i].charCodeAt(0)<=122) )
        {
            flag=true;
             break;
        }   
    }
    if(flag==false)
    {
        var voltage=[];
        var voltageAngle=[];
        var current=[];
        var angle=[];
    //  for current Ia and Va......................................
        var Va=data[3];
        var rva;
        for(var i=0;i<Va.length;i++)
       {
           if(i==Va.indexOf("<"))
           {
               Va=Va.slice(0,i);
               voltage.push(Number(Va));
               rva=data[3].slice(i+1);
               voltageAngle.push(Number(rva));

           }
       }
        var Ia=data[0];
        var ra;
       for(var i=0;i<Ia.length;i++)
       {
           if(i==Ia.indexOf("<"))
           {
               Ia=Ia.slice(0,i);
               current.push(Number(Ia));
               ra=data[0].slice(i+1);
               angle.push(Number(ra));

           }
       }
        // for current Ib.......................................
        var Vb=data[4];
        var rvb;
        for(var i=0;i<Vb.length;i++)
       {
           if(i==Vb.indexOf("<"))
           {
               Vb=Vb.slice(0,i);
               voltage.push(Number(Vb));
               rvb=data[4].slice(i+1);
               voltageAngle.push(Number(rvb));

           }
       }
        
        var Ib=data[1];
        var rb;
       for(var i=0;i<Ib.length;i++)
       {
           if(i==Ib.indexOf("<"))
           {
               Ib=Ib.slice(0,i);
               current.push(Number(Ib));
               rb=data[1].slice(i+1);
               angle.push(Number(rb));

           }
       }
    //    for current Ic..........................................
    var Vc=data[5];
    var rvc;
    for(var i=0;i<Vc.length;i++)
   {
       if(i==Vc.indexOf("<"))
       {
           Vc=Vc.slice(0,i);
           voltage.push(Number(Vc));
           rvc=data[5].slice(i+1);
           voltageAngle.push(Number(rvc));

       }
   }    
    
        var Ic=data[2];
        var rc;
       for(var i=0;i<Ic.length;i++)
       {
           if(i==Ic.indexOf("<"))
           {
               Ic=Ic.slice(0,i);
               current.push(Number(Ic));
               rc=data[2].slice(i+1);
               angle.push(Number(rc));

           }
       }
    Result(current,angle,voltage,voltageAngle);
        
    }
    else
    {
        alert("You entered incorrect format...")
    }
    
}
function Result(current,angle,voltage,voltageAngle){
// polar to cartesian----------------------------------------
 var cVa=math.Complex.fromPolar(+voltage[0],+voltageAngle[0]*Math.PI/180);
 cVa=math.round(cVa,0);
 var cVb=math.Complex.fromPolar(+voltage[1],+voltageAngle[1]*Math.PI/180);
 cVb=math.round(cVb,0);
 var cVc=math.Complex.fromPolar(+voltage[2],+voltageAngle[2]*Math.PI/180);
 cVc=math.round(cVc,0);
 var cIa=math.Complex.fromPolar(+current[0],+angle[0]*Math.PI/180);
 cIa=math.round(cIa,0);
 var cIb=math.Complex.fromPolar(+current[1],+angle[1]*Math.PI/180);
 cIb=math.round(cIb,0);
 var cIc=math.Complex.fromPolar(+current[2],+angle[2]*Math.PI/180);
 cIc=math.round(cIc,0);
//  console.log(cIa);
//  console.log(cIb);
//  console.log(cIc);
//  -----------------------------------------------------------
    var a=math.Complex.fromPolar(1,120*Math.PI/180);
    var a_sq=math.Complex.fromPolar(1,-120*Math.PI/180);
    // --------------------------------------------------------
    var aIb=math.multiply(cIb,a); 
    var a_sqI=math.multiply(cIc,a_sq);
    // --------------------------------------------------------
    var Ib_a_sq=math.multiply(cIb,a_sq);
     var Ic_a=math.multiply(cIc,a)
    // --------------------------------------------------------
     var I_z=math.add(cIa,cIb,cIc);
     I_z=math.divide(I_z,3);
     I_z=math.round(I_z,0);
    //  console.log(I_z)
    //  -------------------------------------------------------
     var I_p=math.add(cIa,aIb,a_sqI);
     I_p=math.divide(I_p,3);
     I_p=math.round(I_p,0);
    //  console.log(I_p)
    //---------------------------------------------------------
   
    var I_n=math.add(cIa,Ib_a_sq,Ic_a);
    I_n=math.divide(I_n,3);
    I_n=math.round(I_n,0);
    // console.log(I_n)
   // ---------------------------------------------------------
    if(I_z.equals(I_p) && I_p.equals(I_n) && I_n.equals(I_z))
    {
        alert("single line to ground fault")
    }
   else if(I_z.equals(math.complex(0,0)) 
   && I_p.equals(math.multiply(I_n,-1)))
    {
        alert("Line to line  Fault ")
    }
    else if(I_p.equals(math.multiply(math.add(I_z,I_n),-1)))
    {
        alert("double line to ground fault")

    }
   else if(I_z.equals(math.complex(0,0)) && math.add(cVa,cVb,cVc).equals(math.complex(0,0)))
    {
        alert("3-phase balanced fault")
    }
    else{
        alert("enter correct phasors")
    }
    console.log(math.add(cVa,cVb,cVc))
    
    
}

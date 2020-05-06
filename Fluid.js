function FindShortestPath()
{
    var startend = document.getElementById('Shortest').value.split('-');
    var Nodes = document.getElementById('Nodes').value.split(',');
    var n = Nodes.length
    var D = new Array(n)

    //W = D0 in Algorithm Design
    var Edges = document.getElementById('Edges').value.split(',');
    for(var i = 0;i<D.length;i++)
        {
            D[i]=new Array(n);
        }
  
    var P = new Array(n)

for(var i = 0;i<n;i++)
        {
            P[i]=new Array(n);
        }
   //console.log(P);
    for(var i = 0;i<D.length;i++)
        {
            for(var j = 0;j<D.length;j++)
                {
                    P[i][j]=-1
                   if(i == j){
                       D[i][j] = 0;
                       continue;
                   }
                    
                    var condition = false
                    for(var k = 0;k<Edges.length;k++)
                        {
                            
                            var Edge = Edges[k].split('-')
                            //console.log(Edge);
                            if((Edge[0] == Nodes[i]&& Nodes[j]==Edge[1]) ||(Nodes[j]==Edge[0]&&Nodes[i]==Edge[1]))
                                {
                                D[i][j] = Number(Edge[2]);
                                    condition =true;
                                  
                                    
                                }
                                
                        }
                    if(!condition)
                        D[i][j] = 1000;
                }
        }
  
    for(var k = 0;k<n;k++)
        {
            for(var i = 0;i<D.length;i++)
                {
                    
                    for(var j = 0 ;j<D.length;j++)
                        {
                            if(D[i][k]+D[k][j]<D[i][j])
                                {
                                   
                                    P[i][j] = k;
                                    D[i][j] = D[i][k]+D[k][j];
                                }
                           
                           
                        }
                }

        }

    var start =0;
    var end =0;
    for(var i = 0;i<Nodes.length;i++)
        {
            if(startend[0] == Nodes[i])
                start = i;
            if(startend[1] == Nodes[i])
                end = i;
        }
  
    var list = [];
    var result = GetListOfNodesInShortestPath(start,end,P,list,0);
    console.log(result);

    DrawGraph(result);
}
function DrawGraph(result)
{
    //Getting The Values To Draw The Graph
    var NodesString = document.getElementById('Nodes').value;
    var EdgesString = document.getElementById('Edges').value;
    //Spliting The String To Get Values
    var NodesArray = NodesString.split(",");

    var EdgesArray = EdgesString.split(",");
    //Setting Sizes In canvas
    //Setting Rows and Columns Based On Formula i Found
     var numberofcols = ((NodesArray.length/2) - 1)*2;
    var numberofrows = NodesArray.length/2;
    while(true)
        {
           if(numberofcols % 2 == 0 && numberofrows % 2 == 0)
               break;
            else
                {
                    if( numberofcols % 2 != 0)
               numberofcols = Math.floor(numberofcols)+1;
                    if(numberofrows % 2 != 0)
                        numberofrows = Math.floor(numberofrows)+1;
                }
        }


    var matrixofdraw = new Array(numberofrows);
    for(var i = 0 ; i< matrixofdraw.length ; i++)
        {
            matrixofdraw[i] = new Array(numberofcols)
        }
    //Setting Matrix With name of Nodes
    var nodespointer = 0;
    var ie = numberofrows -1
    var j =0;
    var condition = false;
    for(var i = 0 ;i<numberofrows;i++)
        {
                                if(j<ie)
                                    {
                                 matrixofdraw[i][j] = NodesArray[nodespointer++];
                                matrixofdraw[i][ie] = NodesArray[nodespointer++];
                                    }
                                        else
                                    {
                                        matrixofdraw[i][ie] = NodesArray[nodespointer++];
                                        matrixofdraw[i][j] = NodesArray[nodespointer++];
                                    }

                            if(i<numberofrows/2-1)
                                {
                                j+=2
                                ie-=2
                                }
                            if(i>numberofrows/2-1)
                                {
                                    j-=2;
                                    ie+=2;
                                }




        }
    //console.log(matrixofdraw)
    //console.log(NodesArray)
    var mycanvas = document.getElementById('MyCanvas');
        var radius=Number(mycanvas.getAttribute("width"))/(numberofcols * 2)
    var ctx = mycanvas.getContext("2d");
    nodespointer =0;
    for (var i = 0 ;i<matrixofdraw.length;i++)
        {
            for(var j = 0;j<matrixofdraw[i].length;j++)
                {
                    if(matrixofdraw[i][j] != null)
                        {
                            ctx.fillStyle = "red";
                        ctx.beginPath();

                        ctx.arc(j*radius*2+radius,i*radius*2+radius, radius*(1/2), 0, 2 * Math.PI);
                        ctx.stroke();

                           ctx.font = "15px Arial";
                            ctx.fillStyle = "red";
                            ctx.fillText(NodesArray[nodespointer],j*radius*2+radius*(6/7), i*radius*2+radius*(10/9));
                            nodespointer++;
                        }
                }
        }
    //Drawing Lines
    for(var i = 0 ; i<EdgesArray.length;i++)
        {
            var Edge = EdgesArray[i].split('-')
            var x1,x2,y1,y2;
            var b1 = false;
            var b2 = false;
            for(var j = 0;j<numberofrows;j++)
                {

                    for(var k = 0 ;k<numberofcols;k++)
                        {
                            if(matrixofdraw[j][k] == Edge[0])
                                {
                                    x1 = k*radius*2+radius;
                                    y1 = j*radius*2+radius;
                                    b1 = true;
                                }
                            if(matrixofdraw[j][k] == Edge[1])
                                {
                                    x2 = k*radius*2+radius;
                                    y2 = j*radius*2+radius;
                                    b2 = true

                                }

                        }

                    if(b1 && b2)
                        break;
                }
            if(x1 > x2)
                {
                    var temp = x2;
                    x2 = x1;
                    x1 = temp;
                    temp = y1;
                    y1 = y2;
                    y2 = temp;
                }
            var teta = Math.atan((y2-y1)/(x2-x1));



            var xr1 = x1+Math.cos(teta)*radius/2;
            var yr1 = y1+Math.sin(teta)*radius/2;
            var xr2 = x2+Math.cos(teta + Math.PI)*radius/2;
            var yr2 = y2+Math.sin(teta + Math.PI)*radius/2;
            ctx.beginPath()
            var condition = false;
            for(var s = 0 ; s<result.length;s++)
                {
                    if(NodesArray[Number(result[s].split('-')[0])]==EdgesArray[i].split('-')[0] && NodesArray[Number(result[s].split('-')[1])]== EdgesArray[i].split('-')[1] ||(NodesArray[Number(result[s].split('-')[1])]==EdgesArray[i].split('-')[0] && NodesArray[Number(result[s].split('-')[0])]== EdgesArray[i].split('-')[1]) )
                        condition = true;
                }
            if(condition)
              ctx.strokeStyle = "#26A69A";
            condition = false
            ctx.moveTo(xr1, yr1);
            ctx.lineTo(xr2, yr2);
            ctx.stroke();
            ctx.strokeStyle = "#000000";
            ctx.beginPath()
             ctx.font = "15px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(Edge[2],(xr1+xr2)/2,(yr1+yr2)/2);
            ctx.stroke()


        }


}
function DrawCanvas()
{
    var Length = window.innerWidth/2;
    document.getElementById('MyCanvas').setAttribute('width',Length.toString());
    document.getElementById('MyCanvas').setAttribute('height',Length.toString());
}
function GetListOfNodesInShortestPath(start , end , p,list,counter)
{
   // console.log(start)
    //console.log(end)
   // console.log(p.length)
   console.log(list)
   console.log(p)
    if(p[start][end] != -1)
        {
            console.log("test")
            GetListOfNodesInShortestPath(start , p[start][end],p,list,counter+1)
            list.push(p[start][end]);
            
            GetListOfNodesInShortestPath(p[start][end],end,p,list,counter +1);
        }

    var resultlist = [];

        if(counter == 0)
            {
                if(list.length == 0)
                {
                    resultlist.push(start.toString()+"-"+end.toString())
                    return resultlist
                }
                resultlist.push(start.toString()+"-"+list[0]);
                
               for(var i =1 ; i<list.length;i++)
                    {
                        resultlist.push(list[i-1].toString()+"-"+list[i].toString());
                    }
                    try{
                resultlist.push(list[list.length -1].toString()+"-"+end.toString())
                    }
                    catch{

                    }
            }
    
    return resultlist;
}

